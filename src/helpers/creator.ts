import { randomUUID } from "crypto"

export const createString = () => `string-${randomUUID()}`

export const createNumber = () => randomUUID()

export const createBoolean = () => Math.random() * 100 >= 49