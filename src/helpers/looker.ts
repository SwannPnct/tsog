import ts from "typescript"

export const getMembers = (node: any): null | ts.Node[] => {
    switch (node.kind) {
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeLiteral:
            return node.members
        case ts.SyntaxKind.TypeAliasDeclaration:
            return node.type.members
        default:
            return null
    }
}

export const getName = (node: any): string => {
    return node.name.escapedText
}

export const findStatementByName = (file: ts.SourceFile, name: string) => {
    return file.statements.find((child: ts.Statement) => getName(child) === name)
}

export const getTypeKind = (node: any): number => {
    return getKind(node.type)
}

export const getKind = (node: any): number => {
    return node.kind
}
