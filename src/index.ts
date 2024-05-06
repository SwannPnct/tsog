import { _generate } from './helpers/generator'
import { AnyObjectType } from './type'

export const generate = <T>(targetName: string, overrides: AnyObjectType = {}): T => {
	const generated = _generate(targetName)

	if (!Array.isArray(generated) && typeof generated === 'object') {
		for (const evaluated in overrides) 
			eval(`generated.${evaluated} = ${JSON.stringify(overrides[evaluated])}`)
        
	}

	return generated
}

export { defineConfig } from './config'