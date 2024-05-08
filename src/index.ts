import { _generate } from './helpers/generator'
import { OptionsType } from './type'

export const generate = <T>(targetName: string, options: OptionsType = {}): T => {
	const generated = _generate(targetName)

	if (!Array.isArray(generated) && typeof generated === 'object') {
		for (const evaluated in options?.overrides) 
			eval(`generated.${evaluated} = ${JSON.stringify(options.overrides[evaluated])}`)
        
	}

	return generated
}

export { defineConfig } from './config'