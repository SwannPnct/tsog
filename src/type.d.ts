export interface GenericObjectInterface {
    name: string
    id: number
    isActive: boolean
}

export type GenericObjectType = {
    name: string
    id: number
    isActive: boolean
}

export interface OptionalObjectInterface {
    name?: string
    id?: number
    isActive?: boolean
}

export type OptionalObjectType = {
    name?: string
    id?: number
    isActive?: boolean
}

export interface ArrayObjectInterface {
    ids: number[]
    names: string[]
}

export interface DifferentTypeObjectInterface {
    numsOrStrings: (string | number)[]
}

export interface ParentObjectInterface {
    nestedInterfaces: GenericObjectInterface[]
    nestedType: GenericObjectType
    nestedObject: {
        id: number
        name: string
    }
}

export interface ComplexObjectInterface {
    id: number
    ids: number[]
    name: string
    names: string[]
    random: string | number
    optional?: number
    nested: ParentObjectInterface
}

export interface EnumObjectInterface {
    type: 'incident' | 'false_negative'
    binary: 1 | 0
}

export type SingleType = string