import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Item, ItemSize, Order, Review } from '../../entities';
import { Repository } from 'typeorm';
import { ReviewRequest } from './dtos/ReviewRequest';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(ItemSize)
    private readonly itemSizeRepository: Repository<ItemSize>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly i18n: I18nService
  ) {}

  async createReview(account: Account, body: ReviewRequest) {
    const itemSize = await this.itemSizeRepository.findOne({
      where: { id: body.itemSizeId },
      relations: ["item"] // Load the item associated with the itemSize
    });

    if (!itemSize) {
      throw new NotFoundException(
        this.i18n.t('error.item.itemSizeNotFound', {
          args: { itemId: body.itemSizeId },
        })
      );
    }

    const order = await this.orderRepository.findOne({
      where: { id: body.orderId },
    });

    if (!order) {
      throw new NotFoundException(
        this.i18n.t('error.order.orderNotFound', {
          args: { itemId: body.orderId },
        })
      );
    }

    const review = await this.reviewRepository.save({
      accountId: account.id,
      itemSizeId: body.itemSizeId,
      orderId: body.orderId,
      comment: body.comment,
      rating: body.rating,
    });

    // Update the item's rating
    const item = itemSize.item; // Get the item from the itemSize

    const reviews = await this.reviewRepository.find({
      where: { itemSize: { item: { id: item.id } } }, // Find reviews for the item
      relations: ["itemSize.item"]
    });

    // Calculate the new average rating
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRatings / reviews.length;

    item.rating = averageRating;
    await this.itemRepository.save(item);

    return review;
  }
}