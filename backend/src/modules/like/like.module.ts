import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Item, Like } from '../../entities';
import { AccountService } from '../account/account.service';

@Module({
  imports : [TypeOrmModule.forFeature([Like, Account, Item])],
  providers: [LikeService, AccountService],
  controllers: [LikeController]
})
export class LikeModule {}
