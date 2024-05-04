import { _generate } from "./helpers/generator";

export const generate = (targetName: string): Record<any, any> => _generate(targetName)

console.log(generate('DifferentTypeObjectInterface'))
