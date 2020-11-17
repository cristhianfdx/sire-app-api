import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from 'src/entities/stock.entity';
import { PartsModule } from 'src/parts/parts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), PartsModule],
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
