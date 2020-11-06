import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [join(__dirname, '../entities/*.entity{.ts,.js}')],
  autoLoadEntities: true,
  migrationsRun: true,
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: Boolean(process.env.TYPEORM_AUTO_SYNCHRONIZE),
  logging: true,
  logger: 'file',
  extra: {
    ssl: true,
  },
} as TypeOrmModuleOptions;
