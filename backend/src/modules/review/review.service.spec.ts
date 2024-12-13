import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { Review, ItemSize, Item, Order, Account } from '../../entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@nestjs/common';
import { ReviewRequest } from './dtos/ReviewRequest';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: Repository<Review>;
  let itemSizeRepository: Repository<ItemSize>;
  let itemRepository: Repository<Item>;
  let orderRepository: Repository<Order>;
  let i18nService: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ItemSize),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: I18nService,
          useValue: {
            t: jest.fn().mockImplementation(key => key),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review)
    );
    itemSizeRepository = module.get<Repository<ItemSize>>(
      getRepositoryToken(ItemSize)
    );
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('createReview', () => {
    it('should create a new review and update item rating', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockItemSize: ItemSize = {
        id: 1,
        size: 'M',
        item: { id: 1, name: 'Test Item', rating: 0 },
      } as any;
      const mockOrder: Order = { id: 1 } as any;
      const mockReviewRequest: ReviewRequest = {
        itemSizeId: 1,
        orderId: 1,
        comment: 'Great product!',
        rating: 5,
      };

      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(mockItemSize);
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(mockOrder);
      jest
        .spyOn(reviewRepository, 'save')
        .mockResolvedValue({ id: 1, ...mockReviewRequest } as any);
      jest.spyOn(reviewRepository, 'find').mockResolvedValue([
        { id: 1, rating: 5 },
        { id: 2, rating: 4 },
      ] as any);
      jest.spyOn(itemRepository, 'save').mockResolvedValue({} as any);

      const result = await service.createReview(mockAccount, mockReviewRequest);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id'); 
      expect(result.id).toBe(1); 
      expect(itemRepository.save).toHaveBeenCalledWith({
        id: 1,
        name: 'Test Item',
        rating: 4.5,
      });
    });

    it('should throw NotFoundException if itemSize is not found', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockReviewRequest: ReviewRequest = {
        itemSizeId: 1,
        orderId: 1,
        comment: 'Great product!',
        rating: 5,
      };

      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.createReview(mockAccount, mockReviewRequest)
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if order is not found', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockItemSize: ItemSize = {
        id: 1,
        size: 'M',
        item: { id: 1, name: 'Test Item', rating: 0 },
      } as any;
      const mockReviewRequest: ReviewRequest = {
        itemSizeId: 1,
        orderId: 1,
        comment: 'Great product!',
        rating: 5,
      };

      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(mockItemSize);
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.createReview(mockAccount, mockReviewRequest)
      ).rejects.toThrow(NotFoundException);
    });
  });
});
