import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Item, Review } from '../../entities';
import { AccountService } from '../account/account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review, Account, Item])],
    controllers: [ReviewController],
    providers: [ReviewService, AccountService],
})
export class ReviewModule {}
