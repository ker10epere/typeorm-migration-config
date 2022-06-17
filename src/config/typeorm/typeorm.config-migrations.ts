import { DataSource } from 'typeorm'
import { config } from './typeorm.config'

const datasource = new DataSource(config()) // config is one that is defined in typeorm.config.ts file
datasource.initialize()
export default datasource
