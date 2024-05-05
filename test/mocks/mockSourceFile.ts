import { afterAll, vi } from 'vitest'
import * as files from '../../src/helpers/file'
import ts from 'typescript'
import { readFileSync } from 'fs'
import path from 'path'

export const mockSourceFile = () => {
    const getSourceFileMock = vi.spyOn(files, 'getSourceFile').mockImplementation(() => {
        const filePaths = ['test/types/type.d.ts', 'test/types/alternative_type.d.ts']
        let data = ''

        filePaths.forEach((filePath) => {
            data += readFileSync(path.resolve(filePath), { encoding: 'utf-8' })
            data += '\n'
        })

        return ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)
    })

    afterAll(() => {
        getSourceFileMock.mockRestore()
    })

    return {
        getSourceFileMock
    }
}