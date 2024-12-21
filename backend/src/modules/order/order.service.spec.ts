import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Account,
  Cart,
  Item,
  ItemSize,
  Order,
  OrderDetail,
  Voucher,
} from '../../entities';
import { OrderService } from './order.service';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { OrderRequest } from './dtos/orderRequest';
import {
  ItemAvailabilityEnum,
  OrderPaymentMethodEnum,
  OrderStatusEnum,
} from '../../common';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;
  let orderDetailRepository: Repository<OrderDetail>;
  let cartRepository: Repository<Cart>;
  let itemRepository: Repository<Item>;
  let itemSizeRepository: Repository<ItemSize>;
  let voucherRepository: Repository<Voucher>;
  let i18nService: I18nService;

  const mockOrderRepo = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };
  const mockOrderDetailRepo = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };
  const mockCartRepo = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };
  const mockItemRepo = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };
  const mockItemSizeRepo = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };
  const mockVoucherRepo = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepo,
        },
        {
          provide: getRepositoryToken(OrderDetail),
          useValue: mockOrderDetailRepo,
        },
        {
          provide: getRepositoryToken(Cart),
          useValue: mockCartRepo,
        },
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepo,
        },
        {
          provide: getRepositoryToken(ItemSize),
          useValue: mockItemSizeRepo,
        },
        {
          provide: getRepositoryToken(Voucher),
          useValue: mockVoucherRepo,
        },
        {
          provide: I18nService,
          useValue: {
            t: jest.fn().mockImplementation(key => key),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderDetailRepository = module.get<Repository<OrderDetail>>(
      getRepositoryToken(OrderDetail)
    );
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
    itemSizeRepository = module.get<Repository<ItemSize>>(
      getRepositoryToken(ItemSize)
    );
    voucherRepository = module.get<Repository<Voucher>>(
      getRepositoryToken(Voucher)
    );
    i18nService = module.get<I18nService>(I18nService);
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const account = new Account();
      account.id = 1;

      const cart = new Cart();
      cart.id = 1;
      cart.itemSizeId = 1;
      cart.quantity = 2;

      const itemSize = new ItemSize();
      itemSize.id = 1;
      itemSize.item = new Item();
      itemSize.item.availability = ItemAvailabilityEnum.IN_STOCK;

      cart.itemSize = itemSize;

      const voucher = new Voucher();
      voucher.id = 1;
      voucher.count = 1;
      voucher.minPrice = 100;
      voucher.startAt = new Date(Date.now() - 1000);
      voucher.endAt = new Date(Date.now() + 1000);

      const orderReq: OrderRequest = {
        carts: [cart],
        phoneNumber: '1234567890',
        receiver: 'John Doe',
        address: '123 Street',
        note: 'Test note',
        paymentMethod: OrderPaymentMethodEnum.CASH,
        email: 'john@example.com',
        isPaid: false,
        paymentCode: '123456',
        totalPrice: 200,
        voucherId: 1,
      };

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);
      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(itemSize);
      jest.spyOn(voucherRepository, 'findOne').mockResolvedValue(voucher);
      jest.spyOn(orderRepository, 'create').mockReturnValue({} as any);
      jest.spyOn(orderRepository, 'save').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(orderDetailRepository, 'create').mockReturnValue({} as any);
      jest.spyOn(orderDetailRepository, 'save').mockResolvedValue({} as any);
      jest.spyOn(cartRepository, 'delete').mockResolvedValue({} as any);

      const result = await service.createOrder('en', account, orderReq);

      expect(result).toBeDefined();
      expect(orderRepository.save).toHaveBeenCalled();
      expect(orderDetailRepository.save).toHaveBeenCalled();
      expect(cartRepository.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if cart is not found', async () => {
      const account = new Account();
      account.id = 1;

      const cart = new Cart();
      cart.id = 1;

      const orderReq: OrderRequest = {
        carts: [cart],
        phoneNumber: '1234567890',
        receiver: 'John Doe',
        address: '123 Street',
        note: 'Test note',
        paymentMethod: OrderPaymentMethodEnum.CASH,
        email: 'john@example.com',
        isPaid: false,
        paymentCode: '123456',
        totalPrice: 200,
        voucherId: null,
      };

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.createOrder('en', account, orderReq)
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if item is not in stock', async () => {
      const account = new Account();
      account.id = 1;

      const cart = new Cart();
      cart.id = 1;
      cart.itemSizeId = 1;
      cart.quantity = 2;

      const itemSize = new ItemSize();
      itemSize.id = 1;

      const item = new Item();
      item.availability = ItemAvailabilityEnum.OUT_OF_STOCK;

      itemSize.item = item;
      cart.itemSize = itemSize;

      const orderReq: OrderRequest = {
        carts: [cart],
        phoneNumber: '1234567890',
        receiver: 'John Doe',
        address: '123 Street',
        note: 'Test note',
        paymentMethod: OrderPaymentMethodEnum.CASH,
        email: 'john@example.com',
        isPaid: false,
        paymentCode: '123456',
        totalPrice: 200,
        voucherId: null,
      };

      jest.spyOn(cartRepository, 'findOne').mockResolvedValue(cart);
      jest.spyOn(itemSizeRepository, 'findOne').mockResolvedValue(itemSize);

      await expect(
        service.createOrder('en', account, orderReq)
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateStatusOrder', () => {
    it('should update order status successfully', async () => {
      const order = new Order();
      order.id = 1;
      order.status = OrderStatusEnum.WAIT;

      const updateStatusRequest = {
        id: 1,
        status: OrderStatusEnum.PACKAGING,
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(order);
      jest.spyOn(orderRepository, 'save').mockResolvedValue(order);

      const result = await service.updateStatusOrder('en', updateStatusRequest);

      expect(result).toBeDefined();
      expect(orderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: updateStatusRequest.status })
      );
    });

    it('should throw NotFoundException if order is not found', async () => {
      const updateStatusRequest = {
        id: 1,
        status: OrderStatusEnum.WAIT,
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateStatusOrder('en', updateStatusRequest)
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if order status is CANCEL', async () => {
      const order = new Order();
      order.id = 1;
      order.status = OrderStatusEnum.CANCEL;

      const updateStatusRequest = {
        id: 1,
        status: OrderStatusEnum.DONE,
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(order);

      await expect(
        service.updateStatusOrder('en', updateStatusRequest)
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('CancelOrderById', () => {
    it('should cancel order successfully', async () => {
      const account = new Account();
      account.id = 1;

      const order = new Order();
      order.id = 1;
      order.status = OrderStatusEnum.WAIT;
      order.account = account;

      const cusCancelRequest = {
        id: 1,
        reasonCancel: 'Test reason',
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(order);
      jest.spyOn(orderRepository, 'save').mockResolvedValue(order);

      const result = await service.CancelOrderById(
        'en',
        cusCancelRequest,
        account
      );

      expect(result).toBeDefined();
      expect(orderRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: OrderStatusEnum.CANCEL })
      );
    });

    it('should throw NotFoundException if order is not found', async () => {
      const account = new Account();
      account.id = 1;

      const cusCancelRequest = {
        id: 1,
        reasonCancel: 'Test reason',
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.CancelOrderById('en', cusCancelRequest, account)
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if account does not own the order', async () => {
      const account = new Account();
      account.id = 1;

      const order = new Order();
      order.id = 1;
      order.status = OrderStatusEnum.WAIT;
      order.account = new Account();
      order.account.id = 2;

      const cusCancelRequest = {
        id: 1,
        reasonCancel: 'Test reason',
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(order);

      await expect(
        service.CancelOrderById('en', cusCancelRequest, account)
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if order status is not WAIT', async () => {
      const account = new Account();
      account.id = 1;

      const order = new Order();
      order.id = 1;
      order.status = OrderStatusEnum.ON_THE_ROAD;
      order.account = account;

      const cusCancelRequest = {
        id: 1,
        reasonCancel: 'Test reason',
      };

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(order);

      await expect(
        service.CancelOrderById('en', cusCancelRequest, account)
      ).rejects.toThrow(BadRequestException);
    });
  });
});
