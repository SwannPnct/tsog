import { describe, expect, it } from "vitest";
import { generate } from "../../src";
import { mockRandomizer } from "../mocks/mockRandomizer";
import { mockSourceFile } from "../mocks/mockSourceFile";

describe('index', () => {
    mockRandomizer()
    mockSourceFile()

    const string = "string-string-string-string-string"
    const number = 1
    const boolean = true

    it('generates', () => {
        expect(generate('GenericObjectInterface')).toEqual({
            id: number,
            isActive: boolean,
            name: string
        })

        expect(generate('GenericObjectType')).toEqual({
            id: number,
            isActive: boolean,
            name: string
        })

        expect(generate('OptionalObjectType')).toEqual({})

        expect(generate('DifferentTypeObjectInterface')).toEqual({
            numsOrStrings: [string, string],
        })

        expect(generate('EnumObjectInterface')).toEqual({
            type: 'incident',
            binary: 1
        })

        expect(generate('SingleType')).toEqual(string)

        expect(generate('ParentObjectInterface')).toEqual({
            nestedInterfaces: Array(2).fill({
                id: number,
                isActive: boolean,
                name: string
            }),
            nestedType: {
                id: number,
                isActive: boolean,
                name: string
            },
            nestedObject: {
                id: number,
                name: string
            }
        })
    })
})