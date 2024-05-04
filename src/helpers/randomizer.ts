import { randomInt, randomUUID } from "crypto"

export const randomString = () => randomUUID()

export const randomNumber = () => randomInt(99999999)

export const randomBoolean = () => Math.random() * 100 >= 49

export const randomArray = (): any[] => Array(Math.floor(Math.random() * 10))

export const randomPick = (array: any[]) => array[(Math.floor(Math.random() * array.length))]