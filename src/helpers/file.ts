import { readFileSync } from 'fs'
import path from 'path'
import ts from 'typescript'

export const getSourceFile = () => {
	const filePaths = ['test/type.d.ts', 'test/alternative_type.d.ts']

	if (!filePaths.length) throw new Error('File paths provided by the package.json must be in an array')

	let data = ''

	filePaths.forEach((filePath) => {
		data += readFileSync(path.resolve(filePath), { encoding: 'utf-8' })
		data += '\n'
	})

	return ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)
}