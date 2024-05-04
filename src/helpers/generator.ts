import ts from "typescript";
import { getTypeKind, getName, getKind } from "./looker";
import { createBoolean, createNumber, createString } from "./creator";

export const generateMember = (generated: Record<any, any>, member: any) => {
    if (!!member.questionToken && createBoolean()) {
        return
    }

    const kind = getTypeKind(member)

    switch (kind) {
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

export const generateUnion = (generated: Record<any, any>, member: any) => {
    const { types } = member.type
    const pick = types[(Math.floor(Math.random() * types.length))]

    generateMember(generated, {
        ...member,
        type: pick
    })
}

export const generateArray = (generated: Record<any, any>, member: any) => {
    const size = Math.floor(Math.random() * 10)
    const array: any[] = []
    for (let i = 0; i < size; i++) {
        generateMember(array, {
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
    generated[getName(member)] = createString()
}

export const generateNumber = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = createNumber()
}

export const generateBoolean = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = createBoolean()
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