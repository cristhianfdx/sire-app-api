import * as path from 'path';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const baseDir = path.join(__dirname, '../');
const entitiesPath = `${baseDir}${process.env.TYPEORM_ENTITIES}`;
const migrationPath = `${baseDir}${process.env.TYPEORM_MIGRATIONS}`;

export default {
  type: process.env.TYPEORM_CONNECTION,
  url: process.env.DATABASE_URL,
  entities: [entitiesPath],
  migrations: [migrationPath],
  autoLoadingEntities: true,
  synchronize: true,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  seeds: [`src/modules/core/seeds/*.seed.ts`],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};
