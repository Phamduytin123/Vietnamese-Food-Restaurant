import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Item, Review } from '../../entities';
import { Repository } from 'typeorm';
import { ReviewRequest } from './dtos/ReviewRequest';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        private readonly i18n: I18nService
    ) {}

    async createReview(account: Account, body: ReviewRequest) {
        const item = await this.itemRepository.findOne({
            where: { id: body.itemId },
        });

        if (!item) {
            return new NotFoundException(
                this.i18n.t('error.item.itemNotFound', {
                    args: { itemId: body.itemId },
                })
            );
        }

        const review = await this.reviewRepository.save({
            accountId: account.id,
            itemId: body.itemId,
            comment: body.comment,
            rating: body.rating,
        });

        return review;
    }
}
