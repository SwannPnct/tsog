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

	private createSourceFile () {
		const { files } = this
		if (!files) throw new Error('Type files not configurated')
		if (!files.length) throw new Error('File paths must be provided in an array')

		const uncompiledJSfiles = files.filter((file) => file.endsWith('.js'))
		const typeFiles = files.filter((file) => file.endsWith('.ts'))

		let data = this.compileJS(uncompiledJSfiles)

		typeFiles.forEach((file) => {
			data += '\n'
			data += readFileSync(path.resolve(process.cwd(), file), { encoding: 'utf-8' })
		})

		this.source = ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)
	}

	private compileJS (files: string[]) {
		const options = {
			allowJs            : true,
			declaration        : true, 
			emitDeclarationOnly: true
		}
		const createdFiles: Record<string,string> = {}

		const host = ts.createCompilerHost(options)
		host.writeFile = (fileName: string, contents: string) => createdFiles[fileName] = contents

		const program = ts.createProgram(files, options, host)
		program.emit()

		return Object.values(createdFiles).join('\n') ?? ''
	}

}

let instance: undefined | typeof TSOG.prototype
const _getTSOGSingleton = () => {
	if (!instance) 
		instance = new TSOG()
	
	return instance
}

export default _getTSOGSingleton()
export const generate = _getTSOGSingleton().generate