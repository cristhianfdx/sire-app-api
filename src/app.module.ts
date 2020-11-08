import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';
import { StockModule } from './stock/stock.module';

import * as typeormModuleOptions from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormModuleOptions.default),
    UsersModule,
    AuthModule,
    PartsModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
