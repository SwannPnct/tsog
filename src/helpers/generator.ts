import ts from "typescript";
import { getTypeKind, getName, getKind, findStatementByName, getMembers } from "./looker";
import { randomArray, randomBoolean, randomNumber, randomPick, randomString } from "./randomizer";
import { readFileSync } from "fs";
import path from "path";

const typeFile = 'src/type.d.ts'

export const _generate = (targetName: string): any => {
    const data = readFileSync(path.resolve(typeFile), { encoding: 'utf-8' })
    const file = ts.createSourceFile('src.ts', data, ts.ScriptTarget.Latest)

    const node = findStatementByName(file, targetName)

    if (!node) throw new Error(`Unable to find the type or interface for "${targetName}"`)

    return generateType(node)
}

export const generateType = (node: any) => {
    const members = getMembers(node)

    const generated: any = {}
    if (!members) {
        generateMember(generated, node)
        return generated[getName(node)]
    }

    members.forEach((member) => {
        generateMember(generated, member)
    })
    return generated
}


export const generateMember = (generated: Record<any, any>, member: any) => {
    if (!member) throw new Error('Falsy member')

    if (!!member.questionToken && randomBoolean()) {
        return
    }

    const kind = getTypeKind(member)

    switch (kind) {
        case ts.SyntaxKind.ParenthesizedType:
            generateParenthesizedType(generated, member)
            break;
        case ts.SyntaxKind.TypeReference:
            generateNestedType(generated, member)
            break;
        case ts.SyntaxKind.TypeLiteral:
            generateTypeLiteral(generated, member)
            break;
        case ts.SyntaxKind.UnionType:
            generateUnion(generated, member)
            break;
        case ts.SyntaxKind.ArrayType:
            generateArray(generated, member)
            break;
        case ts.SyntaxKind.StringKeyword:
            generateString(generated, member)
            break;
        case ts.SyntaxKind.NumberKeyword:
            generateNumber(generated, member)
            break;
        case ts.SyntaxKind.BooleanKeyword:
            generateBoolean(generated, member)
            break;
        case ts.SyntaxKind.NullKeyword:
            generateNull(generated, member)
            break;
        case ts.SyntaxKind.UndefinedKeyword:
            generateUndefined(generated, member)
            break;
        case ts.SyntaxKind.LiteralType:
            generateLiteral(generated, member)
            break;
        default:
            throw new Error(`Unsupported type : ${kind}`)
    }
}

export const generateParenthesizedType = (generated: Record<any, any>, member: any) => {
    generateMember(generated, { ...member.type, name: member.name })
}

export const generateUnion = (generated: Record<any, any>, member: any) => {
    const { types } = member.type

    generateMember(generated, {
        ...member,
        type: randomPick(types)
    })
}

export const generateNestedType = (generated: Record<any, any>, member: any) => {
    generated[getName(member)] = _generate(member.type.typeName.escapedText)
}

export const generateTypeLiteral = (generated: Record<any, any>, member: any) => {
    generated[getName(member)] = generateType(member.type)
}

export const generateArray = (generated: Record<any, any>, member: any) => {
    const array = randomArray()
    for (let i = 0; i < array.length; i++) {
        generateMember(array, {
            ...member,
            type: {
                ...member.type.elementType
            },
            name: {
                escapedText: i
            }
        })
    }

    generated[getName(member)] = array
}

export const generateString = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = randomString()
}

export const generateNumber = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = randomNumber()
}

export const generateBoolean = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = randomBoolean()
}

export const generateUndefined = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = undefined
}

export const generateNull = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = null
}

export const generateLiteral = (generated: Record<any, any>, member: any) => {
    const literal = member.type.literal
    const kind = getKind(literal)
    switch (getKind(literal)) {
        case ts.SyntaxKind.NumericLiteral:
            generateNumericLiteral(generated, member, literal)
            break;
        case ts.SyntaxKind.StringLiteral:
            generateStringLiteral(generated, member, literal)
            break;
        default:
            throw new Error(`Unknown literal type : ${kind}`)
    }
}

export const generateNumericLiteral = (generated: Record<any, any>, member: any, literal: any) => {
    generated[getName(member)] = parseInt(literal.text, 10)
}

export const generateStringLiteral = (generated: Record<any, any>, member: any, literal: any) => {
    generated[getName(member)] = literal.text
}