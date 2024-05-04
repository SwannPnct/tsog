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
    ids: number[] | string[]
    nums: (string | number)[]
}

export interface ParentObjectInterface {
    nestedInterface: GenericObjectInterface
    nestedType: GenericObjectType
}

export interface ComplexObjectInterface {
    id: number
    ids: number[]
    name: string
    names: string[]
    random: string | number
    optional?: number
}

export interface EnumObjectInterface {
    type: 'incident' | 'false_negative'
}

export type SingleType = string