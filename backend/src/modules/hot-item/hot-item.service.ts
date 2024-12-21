import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemFilterUtils } from '../../common';
import { Item, Review } from '../../entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class HotItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async getListHotItem(lang: string) {
    const itemFounds = await this.itemRepository.find({
      relations: ['itemSizes', 'itemSizes.orderDetails'],
    });

    // Map items to include orderDetailNum, reviewNum, and rating
    const itemsWithCounts = await Promise.all(
      itemFounds.map(async item => {
        const orderDetailNum = item.itemSizes.reduce(
          (count, itemSize) => count + itemSize.orderDetails.length,
          0
        );

        // Fetch reviews for each itemSize
        const reviews = await this.reviewRepository.find({
          where: {
            itemSize: { id: In(item.itemSizes.map(itemSize => itemSize.id)) },
          },
        });

        const reviewNum = reviews.length;
        const totalRating = reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const averageRating = reviewNum > 0 ? totalRating / reviewNum : 0;

        return {
          ...ItemFilterUtils.filterResponseData(item, lang),
          orderDetailNum,
          reviewNum,
          rating: averageRating,
        };
      })
    );

    itemsWithCounts.sort((a, b) => {
      if (b.orderDetailNum !== a.orderDetailNum) {
        return b.orderDetailNum - a.orderDetailNum;
      }
      if (b.reviewNum !== a.reviewNum) {
        return b.reviewNum - a.reviewNum;
      }
      return b.rating - a.rating;
    });

    return itemsWithCounts;
  }
}
