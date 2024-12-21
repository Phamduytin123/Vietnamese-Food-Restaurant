import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeItem, Item, Account } from '../../entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@nestjs/common';

describe('LikeService', () => {
  let service: LikeService;
  let likeRepository: Repository<LikeItem>;
  let itemRepository: Repository<Item>;
  let i18nService: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: getRepositoryToken(LikeItem),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Item),
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

    service = module.get<LikeService>(LikeService);
    likeRepository = module.get<Repository<LikeItem>>(
      getRepositoryToken(LikeItem)
    );
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('setLike', () => {
    it('should create a new like if item is not liked', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockItem: Item = { id: 1, name: 'Test Item' } as any;
      const mockBody = { itemId: 1 };

      jest.spyOn(likeRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(itemRepository, 'findOne').mockResolvedValue(mockItem);
      jest.spyOn(likeRepository, 'save').mockResolvedValue({} as any);

      const result = await service.setLike(mockAccount, mockBody);

      expect(result).toBeDefined();
      expect(result.message).toBe('success.like.create.success');
      expect(likeRepository.save).toHaveBeenCalled();
    });

    it('should remove the like if item is already liked', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockLike: LikeItem = { id: 1, accountId: 1, itemId: 1 } as any;
      const mockBody = { itemId: 1 };

      jest.spyOn(likeRepository, 'findOne').mockResolvedValue(mockLike);
      jest.spyOn(likeRepository, 'delete').mockResolvedValue({} as any);

      const result = await service.setLike(mockAccount, mockBody);

      expect(result).toBeDefined();
      expect(result.message).toBe('success.like.create.fail');
      expect(likeRepository.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if item is not found', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockBody = { itemId: 1 };

      jest.spyOn(likeRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(itemRepository, 'findOne').mockResolvedValue(null);

      await expect(service.setLike(mockAccount, mockBody)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
