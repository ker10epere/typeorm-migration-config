import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm'
import { DataSourceOptions } from 'typeorm/data-source'
import * as pg from 'pg'
import { join } from 'path'
const url = 'postgres://postgres:postgres@localhost:5432/test?sslmode=disable'

/**
 * @note function is used to initialize environment variables inside it to be used for configurations
 **/
export function config() {
  console.log(join(__dirname, '../../migrations'))

  return {
    driver: pg,
    type: 'postgres',
    url,
    //   migrations: ['src/database/migrations/*{.ts,.js}'],
    entities: [__dirname, '../../**/*.entity{.ts,.js}'], // also tried with [__dirname + '\\entities\\**\\*{.ts,.js}']
    migrations: [__dirname, '../../**/migrations/*migrations{.ts,.js}'],
    //   cli: {
    //     migrationsDir: __dirname + '/../../database/migrations',
    //   },
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    synchronize: false,
    //   ...isSSL(),
    autoLoadEntities: true,
  } as DataSourceOptions
}

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url,
      entities: [],
      migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],

      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: true,
      autoLoadEntities: true,
    }
  },
}
