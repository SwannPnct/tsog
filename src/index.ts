import { _generate } from "./helpers/generator";

export const generate = (targetName: string, overrides: Record<string, any> = {}): Record<any, any> => {
    const generated = _generate(targetName)

    if (!Array.isArray(generated) && typeof generated === "object") {
        for (const evaluated in overrides) {
            eval(`generated.${evaluated} = ${JSON.stringify(overrides[evaluated])}`)
        }
    }

    return generated
}

console.log(generate('ComplexObjectInterface', {
    'nested.nestedInterfaces': [{ ho: 'ho' }],
    'nested.nestedType': { ha: 'ha' },
    'random': 'he',
    'id': 69
}))
