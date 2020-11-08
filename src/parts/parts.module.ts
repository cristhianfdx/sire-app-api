import { Module } from '@nestjs/common';
import { PartsService } from './parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { BranchesController } from './branch.controller';
import { PartsController } from './parts.controller';
import { BranchService } from './branch.service';
import { Part } from 'src/entities/parts.entity';
import { Branch } from 'src/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Branch]), UsersModule],
  providers: [PartsService, BranchService],
  controllers: [PartsController, BranchesController],
  exports: [PartsService],
})
export class PartsModule {}
