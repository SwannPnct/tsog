import { readFileSync } from 'fs'
import path from 'path'
import ts from 'typescript'
import parentJSON from 'parent-package-json'
import { packageJSONType } from '../type'

export const getSourceFile = () => {
	// const parent = parentJSON(undefined)
	// const json = parent.parse()

	// if (!json) throw new Error('Unable to locate package.json file')

	// const filePaths = (json as packageJSONType).tsog.files
	const filePaths = ['test/types/type.d.ts', 'test/types/alternative_type.d.ts']

	if (!filePaths.length) throw new Error('File paths provided by the package.json must be in an array')

	let data = ''

	filePaths.forEach((filePath) => {
		data += readFileSync(path.resolve(filePath), { encoding: 'utf-8' })
		data += '\n'
	})

	return ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)
}