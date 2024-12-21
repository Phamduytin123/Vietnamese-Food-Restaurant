import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { Cart, ItemSize, Account } from '../../entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;
  let itemSizeRepository: Repository<ItemSize>;
  let i18nService: I18nService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ItemSize),
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

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    itemSizeRepository = module.get<Repository<ItemSize>>(
      getRepositoryToken(ItemSize)
    );
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('createCart', () => {
    it('should create a new cart item', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockItemSize: ItemSize = { id: 1, size: 'M' } as any;
      const mockRequest = {
        body: {
          itemSizes: [{ itemSizeId: 1, quantity: 2 }],
        },
      };

      jest
        .spyOn(itemSizeRepository, 'findOneBy')
        .mockResolvedValue(mockItemSize);
      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(cartRepository, 'save').mockResolvedValue({} as any);

      const result = await service.createCart(mockRequest, mockAccount);

      expect(result).toBeDefined();
      expect(cartRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if itemSize is not found', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockRequest = {
        body: {
          itemSizes: [{ itemSizeId: 1, quantity: 2 }],
        },
      };

      jest.spyOn(itemSizeRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        service.createCart(mockRequest, mockAccount)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCart', () => {
    it('should update the cart item', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockCart: Cart = { id: 1, quantity: 2, itemSizeId: 1 } as any;
      const mockItemSize: ItemSize = { id: 1, size: 'M' } as any;
      const mockBody = { quantity: 3, itemSizeId: 1 };

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(mockCart);
      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(mockItemSize);
      jest.spyOn(cartRepository, 'save').mockResolvedValue({} as any);

      const result = await service.updateCart(mockBody, 1, mockAccount);

      expect(result).toBeDefined();
      expect(cartRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart is not found', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockBody = { quantity: 3, itemSizeId: 1 };

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateCart(mockBody, 1, mockAccount)
      ).rejects.toThrow(NotFoundException);
    });

    it('should remove the cart if quantity is 0', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockCart: Cart = { id: 1, quantity: 2, itemSizeId: 1 } as any;
      const mockItemSize: ItemSize = { id: 1, size: 'M' } as any; // Mock ItemSize
      const mockBody = { quantity: 0, itemSizeId: 1 };

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(mockCart);
      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(mockItemSize);
      jest.spyOn(cartRepository, 'remove').mockResolvedValue({} as any);
      jest.spyOn(cartRepository, 'save').mockResolvedValue({} as any);

      const result = await service.updateCart(mockBody, 1, mockAccount);

      expect(result).toBeDefined();
      expect(cartRepository.remove).toHaveBeenCalled();
    });
  });

  describe('deleteCart', () => {
    it('should delete the cart item', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;
      const mockCart: Cart = { id: 1, quantity: 2, itemSizeId: 1 } as any;

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(mockCart);
      jest.spyOn(cartRepository, 'remove').mockResolvedValue({} as any);

      const result = await service.deleteCart(1, mockAccount);

      expect(result).toBeDefined();
      expect(cartRepository.remove).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart is not found', async () => {
      const mockAccount: Account = { id: 1, name: 'Test User' } as any;

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteCart(1, mockAccount)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
