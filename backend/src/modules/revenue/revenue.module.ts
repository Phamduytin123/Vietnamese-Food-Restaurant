import { Module } from '@nestjs/common';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Order, Review } from '../../entities';
import { AccountService } from '../account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Order, Review])],
  controllers: [RevenueController],
  providers: [RevenueService, AccountService],
})
export class RevenueModule {}
