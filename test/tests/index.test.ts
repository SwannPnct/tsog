import { describe, expect, it, vi } from 'vitest'
import { mockRandomizer } from '../mocks/mockRandomizer'
import { DatedInterface, DifferentTypeObjectInterface, EnumObjectInterface, GenericObjectInterface, GenericObjectType, OptionalObjectType, SingleType } from '../types/type'
import { ParentObjectInterface } from '../types/alternative_type'
import tsog from '../../src'

describe('index', () => {
	const {generate} = tsog
	mockRandomizer()

	const string = 'string-string-string-string-string'
	const number = 1
	const boolean = true

	it('generates', () => {
		vi.useFakeTimers()
		const now = new Date()
		vi.setSystemTime(now)

		expect(generate<GenericObjectInterface>('GenericObjectInterface')).toEqual({
			id      : number,
			isActive: boolean,
			name    : string
		})

		expect(generate<GenericObjectType>('GenericObjectType')).toEqual({
			id      : number,
			isActive: boolean,
			name    : string
		})

		expect(generate<OptionalObjectType>('OptionalObjectType')).toEqual({})

		expect(generate<DifferentTypeObjectInterface>('DifferentTypeObjectInterface')).toEqual({
			numsOrStrings: [string, string]
		})

		expect(generate<EnumObjectInterface>('EnumObjectInterface')).toEqual({
			type  : 'incident',
			binary: 1
		})

		expect(generate<SingleType>('SingleType')).toEqual(string)

		expect(generate<ParentObjectInterface>('ParentObjectInterface')).toEqual({
			nestedInterfaces: Array(2).fill({
				id      : number,
				isActive: boolean,
				name    : string
			}),
			nestedType: {
				id      : number,
				isActive: boolean,
				name    : string
			},
			nestedObject: {
				id  : number,
				name: string
			}
		})

		expect(generate<DatedInterface>('DatedInterface')).toEqual({
			createdAt: now,
			deletedAt: now
		})

		expect(generate('uncompiledObject')).toEqual({
			name: string,
			id: number
		})

		vi.useRealTimers()
	})

	it('overrides', () => {
		expect(generate<GenericObjectInterface>('GenericObjectInterface', {
			overrides: {
				id: number + 1
			}})).toEqual({
			id      : number + 1,
			isActive: boolean,
			name    : string
		})

		expect(generate<ParentObjectInterface>('ParentObjectInterface', {
			overrides: {
				'nestedInterfaces[0]': {
					newKey: string
				} 
			}})).toEqual({
			nestedInterfaces: [{
				newKey: string
			},{
				id      : number,
				isActive: boolean,
				name    : string
			}],
			nestedType: {
				id      : number,
				isActive: boolean,
				name    : string
			},
			nestedObject: {
				id  : number,
				name: string
			}
		})
	})
})