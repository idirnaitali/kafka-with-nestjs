import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'pass',
  database: 'kafka-nest',
  autoLoadEntities: true,
  synchronize: true,
  cli: {
    migrationsDir: 'db.migration',
    entitiesDir: 'src/entities',
  },
};
