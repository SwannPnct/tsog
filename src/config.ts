import { ConfigType } from './type'

const configuration: ConfigType = {
	files: null
}

export default configuration

export const defineConfig = (config: ConfigType) => {
	configuration.files = config.files
}