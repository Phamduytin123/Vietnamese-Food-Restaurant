import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Item, LikeItem } from '../../entities';
import { AccountService } from '../account/account.service';

@Module({
  imports : [TypeOrmModule.forFeature([LikeItem, Account, Item])],
  providers: [LikeService, AccountService],
  controllers: [LikeController]
})
export class LikeModule {}
