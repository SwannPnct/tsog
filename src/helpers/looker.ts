import ts from "typescript"

export const getMembers = (node: ts.Node): null | ts.Node[] => {
    switch (node.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
            return (node as any).members
        case ts.SyntaxKind.TypeAliasDeclaration:
            return (node as any).type.members
        default:
            return null
    }
}

export const getName = (node: ts.Node): string => {
    return (node as any).name.escapedText
}
