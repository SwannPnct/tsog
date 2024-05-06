import { GenericObjectInterface, GenericObjectType } from './type'

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