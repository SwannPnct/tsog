import ts from "typescript";
import { getKind, getName } from "./looker";
import { createBoolean, createNumber, createString } from "./creator";

export const generateMember = (generated: Record<any, any>, member: ts.Node) => {
    if (!!(member as any).questionToken && createBoolean()) {
        return
    }

    switch (getKind(member)) {
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
        default:
            break;
    }
}

export const generateArray = (generated: Record<any, any>, member: ts.Node) => {
    const size = Math.floor(Math.random() * 10)
    const array: any[] = []
    for (let i = 0; i < size; i++) {
        generateMember(array, ({
            type: {
                ...(member as any).type.elementType
            },
            name: {
                escapedText: i
            }
        }) as any)
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