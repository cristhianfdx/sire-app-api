import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import * as dbConfig from './config/database.config';

const typeOrmOptions = dbConfig.default as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
