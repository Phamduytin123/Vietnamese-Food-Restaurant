import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    Account,
    Cart,
    Item,
    ItemSize,
    Order,
    OrderDetail,
} from '../../entities';
import { Repository } from 'typeorm';
import { OrderRequest } from './dtos/orderRequest';
import { I18nService } from 'nestjs-i18n';
import {
    CustomTranslateOptions,
    ItemAvailabilityEnum,
    OrderStatusEnum,
} from '../../common';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(ItemSize)
        private readonly itemSizeRepository: Repository<ItemSize>,
        private readonly i18n: I18nService
    ) {}

    async createOrder(lang: string, account: Account, orderReq: OrderRequest) {
        const {
            carts,
            phoneNumber,
            receiver,
            address,
            note,
            paymentMethod,
            email,
        } = orderReq;

        const foundCarts = [];

        var isCart = true;

        for (const cart of carts) {
            var foundCart = new Cart();

            if (cart.id) {
                foundCart = await this.cartRepository.findOne({
                    where: { id: cart.id, accountId: account.id },
                    relations: ['itemSize', 'itemSize.item'],
                });

                if (!foundCart) {
                    return new NotFoundException(
                        this.i18n.t('error.cart.cartNotFound', {
                            args: { cartId: cart.id },
                        })
                    );
                }
            } else {
                isCart = false;
                foundCart = cart;
                const itemSize = await this.itemSizeRepository.findOne({
                    where: { id: cart.itemSizeId },
                    relations: ['item'],
                });

                if (!itemSize) {
                    return new NotFoundException(
                        this.i18n.t('error.item.itemNotFound', {
                            args: { itemId: cart.itemSizeId },
                        })
                    );
                }

                foundCart.itemSize = itemSize;
            }

            if (
                foundCart.itemSize.item.availability !==
                ItemAvailabilityEnum.IN_STOCK
            ) {
                return new ForbiddenException(
                    this.i18n.t('error.cart.itemStatusIsNotInStock', {
                        args: {
                            itemId: foundCart.itemSize.item.id,
                            itemStatus: foundCart.itemSize.item.availability,
                        },
                    })
                );
            }

            foundCarts.push(foundCart);
        }

        const totalPrice = foundCarts.reduce((totalPrice, foundCart) => {
            return totalPrice + foundCart.itemSize.price * foundCart.quantity;
        }, 0);

        const newOrder: Order = this.orderRepository.create({
            accountId: account.id,
            address: address,
            email: email,
            note: note ? note : '',
            phoneNumber: phoneNumber,
            paymentMethod: paymentMethod,
            receiver: receiver,
            totalPrice: totalPrice,
            status: OrderStatusEnum.WAIT,
        });

        // Tạo orderDetail
        const order = await this.orderRepository.save(newOrder);

        order.orderDetails = [];

        // Xóa cart

        foundCarts.forEach(cart => {
            const orderDetail: OrderDetail = this.orderDetailRepository.create({
                price: cart.itemSize.price,
                orderId: order.id,
                itemSizeId: cart.itemSizeId,
                quantity: cart.quantity,
            });
            order.orderDetails.push(orderDetail);
            this.orderDetailRepository.save(orderDetail);
            if (isCart) {
                this.cartRepository.delete({ id: cart.id });
            }
        });

        return order;
    }
}
