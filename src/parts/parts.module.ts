import { forwardRef, Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { BrandsController } from './brand.controller';
import { PartsController } from './parts.controller';
import { BrandService } from './brand.service';
import { Part } from 'src/entities/parts.entity';
import { Brand } from 'src/entities/brand.entity';
import { Stock } from 'src/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Brand, Stock]), UsersModule],
  providers: [PartsService, BrandService],
  controllers: [PartsController, BrandsController],
  exports: [PartsService],
})
export class PartsModule {}
