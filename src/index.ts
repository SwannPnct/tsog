import { readFileSync } from 'fs'
import { _generate } from './helpers/generator'
import { OptionsType } from './type'
import path from 'path'
import ts from 'typescript'

class TSOG {
	files: string[] | null
	source: ts.SourceFile | null

	constructor () {
		this.files = null
		this.source = null
	}

	defineFiles (files: string[]) {
		this.files = files
		this.createSourceFile()
	}

	generate<T> (typeName: string, options: OptionsType = {}): T {
		const generated = _generate(typeName)

		if (!Array.isArray(generated) && typeof generated === 'object') {
			for (const evaluated in options?.overrides)
				eval(`generated.${evaluated} = ${JSON.stringify(options.overrides[evaluated])}`)

		}

		return generated
	}

	createSourceFile() {
		const { files } = this
		if (!files) throw new Error('Type files not configurated')
		if (!files.length) throw new Error('File paths must be provided in an array')

		let data = ''

		files.forEach((file) => {
			data += readFileSync(path.resolve(process.cwd(), file), { encoding: 'utf-8' })
			data += '\n'
		})

		this.source = ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)
	}
}

let instance: undefined | typeof TSOG.prototype
export const getTSOGSingleton = () => {
	if (!instance) 
		instance = new TSOG()
	
	return instance
}

export default getTSOGSingleton()