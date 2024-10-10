import { Injectable, NotFoundException } from '@nestjs/common';
import { Account, Cart, ItemSize } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemFilterUtils } from '../../common';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(ItemSize)
        private readonly itemSizeRepository: Repository<ItemSize>
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
                    `Item size with id ${itemSizeId} not found`
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
}
