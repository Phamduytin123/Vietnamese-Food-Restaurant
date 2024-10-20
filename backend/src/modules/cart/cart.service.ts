import { CurrentAccount } from './../../common/decorator/currentAccount.decorator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Cart, ItemSize } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemFilterUtils } from '../../common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(ItemSize)
        private readonly itemSizeRepository: Repository<ItemSize>,
        private readonly i18n: I18nService
    ) {}

    async createCart(request: any, currentAccount: Account) {
        const { body } = request;
        const { itemSizes } = body;

        const cartsToSave = [];

        for (const itemSize of itemSizes) {
            const { itemSizeId, quantity } = itemSize;

            const FoundItemSize = await this.itemSizeRepository.findOneBy({
                id: itemSizeId,
            });
            if (!FoundItemSize) {
                throw new NotFoundException(
                    this.i18n.t('error.item.itemSizeNotFound', {
                        args: {
                            itemId: itemSizeId,
                        },
                    })
                );
            }

            let cart = await this.cartRepository.findOne({
                where: { accountId: currentAccount.id, itemSizeId: itemSizeId },
            });

            if (cart) {
                cart.quantity += quantity;
            } else {
                cart = new Cart();
                cart.accountId = currentAccount.id;
                cart.itemSizeId = itemSizeId;
                cart.quantity = quantity;
            }

            await this.cartRepository.save(cart);

            cartsToSave.push(cart);
        }

        return cartsToSave;
    }

    async getListCart(lang: string, currentAccount: Account) {
        const carts = await this.cartRepository.find({
            where: { accountId: currentAccount.id },
            order: {
                updatedAt: 'DESC',
                createdAt: 'DESC',
            },
            relations: ['itemSize', 'itemSize.item'],
        });

        return carts.map(cart => ({
            ...cart,
            itemSize: {
                ...cart.itemSize,
                item: ItemFilterUtils.filterResponseData(
                    cart.itemSize.item,
                    lang
                ),
            },
        }));
    }

    async updateCart(body: any, id: number, currentAccount: Account) {
        const { quantity } = body;

        var foundCart = await this.cartRepository.findOne({
            where: { id: id, accountId: currentAccount.id },
            relations: ['itemSize', 'itemSize.item'],
        });

        if (!foundCart) {
            return new NotFoundException(
                this.i18n.t('error.cart.cartNotFound', {
                    args: { cartId: id },
                })
            );
        }

        if (quantity) {
            if (quantity <= 0) {
                await this.cartRepository.remove(foundCart);
                return {
                    message: this.i18n.t('success.cart.removed', {
                        args: {
                            cartId: id,
                        },
                    }),
                };
            }

            foundCart.quantity = quantity;
        }

        await this.cartRepository.save(foundCart);

        return foundCart;
    }

    async deleteCart(id: number, currentAccount: Account) {
        var foundCart = await this.cartRepository.findOne({
            where: { id: id, accountId: currentAccount.id },
            relations: ['itemSize', 'itemSize.item'],
        });

        if (!foundCart) {
            return new NotFoundException(
                this.i18n.t('error.cart.cartNotFound', {
                    args: { cartId: id },
                })
            );
        }

        await this.cartRepository.remove(foundCart);

        return {
            message: this.i18n.t('success.cart.removed', {
                args: {
                    cartId: id,
                },
            }),
        };
    }
}
