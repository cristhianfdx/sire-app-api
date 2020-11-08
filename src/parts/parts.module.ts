import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Part } from 'src/entities/parts.entity';
import { Branch } from 'src/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Branch])],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
