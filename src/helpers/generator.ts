import ts from 'typescript'
import { getTypeKind, getName, getKind, findStatementByName, getMembers } from './node'
import { randomArray, randomBoolean, randomNumber, randomPick, randomString } from './randomizer'
import { AnyObjectType, AnyType } from '../type'
import { getKindName } from './debugger'
import { getSourceFile } from './file'

export const _generate = (targetName: string) => {
	const file = getSourceFile()

	const node = findStatementByName(file, targetName)

	if (!node) throw new Error(`Unable to find the type or interface for "${targetName}"`)

	return generateType(node)
}

export const generateType = (node: AnyType) => {
	const members = getMembers(node)

	const generated: AnyObjectType = {}
	if (!members) {
		generateMember(generated, node)
		return generated[getName(node)]
	}

	members.forEach((member) => {
		generateMember(generated, member)
	})
	return generated
}


export const generateMember = (generated: AnyObjectType, member: AnyType) => {
	if (!member) throw new Error('Falsy member')

	if (!!member.questionToken && randomBoolean()) 
		return
    

	const kind = getTypeKind(member)

	switch (kind) {
		case ts.SyntaxKind.ParenthesizedType:
			generateParenthesizedType(generated, member)
			break
		case ts.SyntaxKind.TypeReference:
			generateNestedType(generated, member)
			break
		case ts.SyntaxKind.TypeLiteral:
			generateTypeLiteral(generated, member)
			break
		case ts.SyntaxKind.UnionType:
			generateUnion(generated, member)
			break
		case ts.SyntaxKind.ArrayType:
			generateArray(generated, member)
			break
		case ts.SyntaxKind.StringKeyword:
			generateString(generated, member)
			break
		case ts.SyntaxKind.NumberKeyword:
			generateNumber(generated, member)
			break
		case ts.SyntaxKind.BooleanKeyword:
			generateBoolean(generated, member)
			break
		case ts.SyntaxKind.NullKeyword:
			generateNull(generated, member)
			break
		case ts.SyntaxKind.UndefinedKeyword:
			generateUndefined(generated, member)
			break
		case ts.SyntaxKind.LiteralType:
			generateLiteral(generated, member)
			break
		default:
			throw new Error(`Unsupported type : ${getKindName(kind)} (${kind})`)
	}
}

export const generateParenthesizedType = (generated: AnyObjectType, member: AnyType) => {
	generateMember(generated, { ...member.type, name: member.name })
}

export const generateUnion = (generated: AnyObjectType, member: AnyType) => {
	const { types } = member.type

	generateMember(generated, {
		...member,
		type: randomPick(types)
	})
}

export const generateNestedType = (generated: AnyObjectType, member: AnyType) => {
	const { escapedText } = member.type.typeName
	switch (escapedText) {
		case 'Date':
			generateDate(generated, member)
			break
		default:
			generated[getName(member)] = _generate(member.type.typeName.escapedText)
			break
	}
}

export const generateTypeLiteral = (generated: AnyObjectType, member: AnyType) => {
	generated[getName(member)] = generateType(member.type)
}

export const generateArray = (generated: AnyObjectType, member: AnyType) => {
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

export const generateString = (generated: AnyObjectType, member: ts.Node) => {
	generated[getName(member)] = randomString()
}

export const generateNumber = (generated: AnyObjectType, member: ts.Node) => {
	generated[getName(member)] = randomNumber()
}

export const generateBoolean = (generated: AnyObjectType, member: ts.Node) => {
	generated[getName(member)] = randomBoolean()
}

export const generateUndefined = (generated: AnyObjectType, member: ts.Node) => {
	generated[getName(member)] = undefined
}

export const generateNull = (generated: AnyObjectType, member: ts.Node) => {
	generated[getName(member)] = null
}

export const generateLiteral = (generated: AnyObjectType, member: AnyType) => {
	const literal = member.type.literal
	const kind    = getKind(literal)
	switch (getKind(literal)) {
		case ts.SyntaxKind.NumericLiteral:
			generateNumericLiteral(generated, member, literal)
			break
		case ts.SyntaxKind.StringLiteral:
			generateStringLiteral(generated, member, literal)
			break
		default:
			throw new Error(`Unknown literal type : ${kind}`)
	}
}

export const generateNumericLiteral = (generated: AnyObjectType, member: AnyType, literal: AnyType) => {
	generated[getName(member)] = parseInt(literal.text, 10)
}

export const generateStringLiteral = (generated: AnyObjectType, member: AnyType, literal: AnyType) => {
	generated[getName(member)] = literal.text
}

export const generateDate = (generated: AnyObjectType, member: ts.Node) => {
	generated[getName(member)] = new Date()
}