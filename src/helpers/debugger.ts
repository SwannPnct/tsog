import ts from 'typescript'

export const getKindName = (kind: number) => {
	return Object.entries(ts.SyntaxKind).find(([, value]) => value === kind)?.[0]
}