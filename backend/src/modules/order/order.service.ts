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
    clean,
    CustomTranslateOptions,
    ItemAvailabilityEnum,
    ItemFilterUtils,
    OrderStatusEnum,
} from '../../common';
import { log } from 'console';
import { OrdersRequest } from './dtos/ordersRequest';
import { CusCancelRequest } from './dtos/cusCancelRequest';

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
    ) { }

    async createOrder(lang: string, account: Account, orderReq: OrderRequest) {
        const {
            carts,
            phoneNumber,
            receiver,
            address,
            note,
            paymentMethod,
            email,
            isPaid,
            paymentCode,
            totalPrice,
            voucherId,
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
                        this.i18n.t('error.item.itemSizeNotFound', {
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
            isPaid: isPaid,
            paymentCode: paymentCode,
            voucherId: voucherId,
        });

        // Tạo orderDetail
        const order = await this.orderRepository.save(newOrder);

        order.orderDetails = [];

        // Xóa cart

        for (const cart of foundCarts) {
            const orderDetail: OrderDetail = this.orderDetailRepository.create({
                price: cart.itemSize.getActualPrice(),
                orderId: order.id,
                itemSizeId: cart.itemSizeId,
                quantity: cart.quantity,
            });
            // Save each OrderDetail to the database
            // const savedOrderDetail = this.orderDetailRepository.save(orderDetail);
            order.orderDetails.push(orderDetail);
            this.orderDetailRepository.save(orderDetail);
            if (isCart) {
                this.cartRepository.delete({ id: cart.id });
            }
        }

        return order;
    }

    async getOrders(lang: string, account: Account, query: OrdersRequest) {
        const conditions = clean({
            status: query.status,
            isPaid: query.isPaid === 'true',
            accountId: account.id,
        });

        const ordersFound = await this.orderRepository.find({
            where: conditions,
            relations: [
                'orderDetails',
                'voucher',
                'orderDetails.itemSize',
                'orderDetails.itemSize.item',
            ],
            order: {
                updatedAt: 'DESC',
                createdAt: 'DESC',
            },
        });

        const orders = ordersFound.map(orderFound => {
            const { name_vi, name_en, ...voucherFilter } = orderFound.voucher;

            return {
                ...orderFound,
                orderDetails: orderFound.orderDetails.map(orderDetailFound => {
                    const { size_en, size_vi, ...itemSizeFilter } =
                        orderDetailFound.itemSize;

                    return {
                        ...orderDetailFound,
                        itemSize: {
                            ...itemSizeFilter,
                            size: orderDetailFound.itemSize[`size_${lang}`],
                            item: ItemFilterUtils.filterResponseData(
                                orderDetailFound.itemSize.item,
                                lang
                            ),
                        },
                    };
                }),
                voucher: {
                    ...voucherFilter,
                    name: orderFound.voucher[`name_${lang}`],
                },
            };
        });

        return orders;
    }

    async getOrderDetail(lang: string, id: number, account: Account) {
        const orderFound = await this.orderRepository.findOne({
            where: { id: id, accountId: account.id },
            relations: [
                'orderDetails',
                'voucher',
                'orderDetails.itemSize',
                'orderDetails.itemSize.item',
            ],
        });

        if (!orderFound) {
            return new NotFoundException(
                this.i18n.t('error.order.orderNotFound', {
                    args: { orderId: id },
                })
            );
        }

        const { name_vi, name_en, ...voucherFilter } = orderFound.voucher;

        const order = {
            ...orderFound,
            orderDetails: orderFound.orderDetails.map(orderDetailFound => {
                const { size_en, size_vi, ...itemSizeFilter } =
                    orderDetailFound.itemSize;

                return {
                    ...orderDetailFound,
                    itemSize: {
                        ...itemSizeFilter,
                        size: orderDetailFound.itemSize[`size_${lang}`],
                        item: ItemFilterUtils.filterResponseData(
                            orderDetailFound.itemSize.item,
                            lang
                        ),
                    },
                };
            }),
            voucher: {
                ...voucherFilter,
                name: orderFound.voucher[`name_${lang}`],
            },
        };

        return order;
    }
    async CancelOrderById(lang: string, cusCancelRequest: CusCancelRequest, account: Account) {
        const orderFound = await this.orderRepository.findOne({
            where: { id: cusCancelRequest.id },
            relations: [
                'orderDetails',
                'account',
                'orderDetails.itemSize',
                'orderDetails.itemSize.item',
            ],
        });
        if (!orderFound) {
            return new NotFoundException(
                this.i18n.t('error.order.orderNotFound', {
                    args: { orderId: cusCancelRequest.id },
                })
            );
        }
        if (account.id !== orderFound.account.id) {
            return new BadRequestException(
                this.i18n.t('error.auth.accountPermissionDenied', {
                    args: { orderId: cusCancelRequest.id },
                })
            );
        }
        if (orderFound.status !== OrderStatusEnum.WAIT) {
            return new BadRequestException(
                this.i18n.t('error.order.orderCannotBeCancelled', {
                    args: { orderId: cusCancelRequest.id },
                })
            )
        }
        orderFound.reasonCancel = cusCancelRequest.reasonCancel;
        orderFound.status = OrderStatusEnum.CANCEL;
        return this.orderRepository.save(orderFound);
    }
}
