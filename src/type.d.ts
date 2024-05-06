export type AnyType = any // eslint-disable-line @typescript-eslint/no-explicit-any

export type AnyObjectType = Record<AnyType, AnyType>

export type AnyArrayType = AnyType[]

export type ConfigType = {
    files: string[] | null
}