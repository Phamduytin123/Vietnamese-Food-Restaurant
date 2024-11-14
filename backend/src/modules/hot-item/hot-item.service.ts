import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemFilterUtils } from '../../common';
import { Item } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class HotItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>
  ) {}

  async getListHotItem(lang: string) {
    const itemFounds = await this.itemRepository.find({
      relations: ['itemSizes', 'itemSizes.orderDetails', 'reviews'],
    });

    // Map items to include orderDetailNum, reviewNum, and rating

    const itemsWithCounts = itemFounds.map(item => {
      const orderDetailNum = item.itemSizes.reduce(
        (count, itemSize) => count + itemSize.orderDetails.length,
        0
      );
      const reviewNum = item.reviews.length;

      return {
        ...ItemFilterUtils.filterResponseData(item, lang),
        orderDetailNum,
        reviewNum,
      };
    });

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
