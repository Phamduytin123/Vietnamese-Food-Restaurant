import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, ItemSize } from '../../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { F } from '@faker-js/faker/dist/airline-C5Qwd7_q';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(ItemSize)
        private readonly itemSizeRepository: Repository<ItemSize>
    ) {}

    async createCart(request: any) {
        const { user, body } = request;
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
                where: { accountId: user.id, itemSizeId: itemSizeId },
            });

            if (cart) {
                cart.quantity += quantity;
            } else {
                cart = new Cart();
                cart.accountId = user.id;
                cart.itemSizeId = itemSizeId;
                cart.quantity = quantity;
            }

            await this.cartRepository.save(cart);

            cartsToSave.push(cart);
        }

        return cartsToSave;
    }
}
