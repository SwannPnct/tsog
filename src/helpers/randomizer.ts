import { randomInt, randomUUID } from 'crypto'
import { AnyArrayType } from '../type'

export const randomString = () => randomUUID()

export const randomNumber = () => randomInt(Number.MAX_SAFE_INTEGER)

export const randomBoolean = () => Math.random() * 100 >= 49

export const randomArray = (): AnyArrayType[] => Array(Math.floor(Math.random() * 10))

export const randomPick = (array: AnyArrayType[]) => array[(Math.floor(Math.random() * array.length))]