import { randomInt, randomUUID } from "crypto"

export const createString = () => randomUUID()

export const createNumber = () => randomInt(99999999)

export const createBoolean = () => Math.random() * 100 >= 49