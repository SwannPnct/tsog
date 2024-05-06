import ts from 'typescript'
import { AnyType } from '../type'

export const getMembers = (node: AnyType): null | ts.Node[] => {
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

export const getName = (node: AnyType): string => {
	return node.name?.escapedText
}

export const findStatementByName = (file: ts.SourceFile, name: string) => {
	return file.statements.find((child: ts.Statement) => getName(child) === name)
}

export const getTypeKind = (node: AnyType): number => {
	return getKind(node.type)
}

export const getKind = (node: AnyType): number => {
	return node.kind
}
