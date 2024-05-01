import ts from "typescript"

export const logReadableSyntaxKind = (node: ts.Node) => {
    console.log(Object.entries(ts.SyntaxKind).find(([_, value]) => value === node.kind))
}