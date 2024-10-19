import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Like } from '../../entities';
import { AccountService } from '../account/account.service';

@Module({
  imports : [TypeOrmModule.forFeature([Like, Account])],
  providers: [LikeService, AccountService],
  controllers: [LikeController]
})
export class LikeModule {}
