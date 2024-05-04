import ts from "typescript";
import { getName } from "./looker";
import { getBooleanProbability } from "./values";

export const generateMember = (generated: Record<any, any>, member: ts.Node) => {
    if (!!(member as any).questionToken && getBooleanProbability()) {
        return
    }

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
}

export const generateString = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = `string-${Date.now()}`
}

export const generateNumber = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = Date.now()
}

export const generateBoolean = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = getBooleanProbability()
}

export const generateUndefined = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = undefined
}

export const generateNull = (generated: Record<any, any>, member: ts.Node) => {
    generated[getName(member)] = null
}