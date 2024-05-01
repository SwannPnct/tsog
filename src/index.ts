import ts from "typescript"
import { readFileSync } from "fs";
import path from "path";
import { getMembers } from "./helpers/looker";
import { generateBoolean, generateNumber, generateString } from "./helpers/generator";

const typeFile = 'src/type.d.ts'

export const generate = (targetName: string): Record<any,any> => {
    const generated = {}

    const data = readFileSync(path.resolve(typeFile), {encoding: 'utf-8'})
    const file = ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)

    const node = file.statements.find((child: ts.Node) => (child as any).name?.escapedText === targetName)

    if(!node) throw new Error('Unable to find the type or interface.')

    const members = getMembers(node)

    if(!members) throw new Error('Unable to find any members')

    members.forEach((member) => {
        switch ((member as any).type.kind) {
            case ts.SyntaxKind.StringKeyword:
                generateString(generated, member)
                break;
            case ts.SyntaxKind.NumberKeyword:
                generateNumber(generated, member)
                break;
            case ts.SyntaxKind.BooleanKeyword:
                generateBoolean(generated, member)
                break;
            default:
                break;
        }
    })

    return generated
}

console.log(generate('GenericObjectType'))
