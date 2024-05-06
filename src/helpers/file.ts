import { readFileSync } from 'fs'
import path from 'path'
import ts from 'typescript'
import config from '../config'

export const getSourceFile = () => {
	if (!config.files) throw new Error('Type files not configurated')

	const {files} = config

	if (!files.length) throw new Error('File paths must be provided in an array')

	let data = ''

	files.forEach((file) => {
		data += readFileSync(path.resolve(process.cwd(), file), { encoding: 'utf-8' })
		data += '\n'
	})

	return ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)
}