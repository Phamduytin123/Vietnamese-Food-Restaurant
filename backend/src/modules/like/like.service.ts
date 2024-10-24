import { CurrentAccount } from './../../common/decorator/currentAccount.decorator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Item, Like } from '../../entities';
import { Repository } from 'typeorm';
import { ItemFilterUtils } from '../../common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        private readonly i18n: I18nService
    ) {}

    async getListLike(currentAccount: Account, lang: string) {
        const listLikeFound = await this.likeRepository.find({
            where: { accountId: currentAccount.id },
            relations: ['item', 'item.itemSizes'],
        });

        const listLike = listLikeFound.map(like => ({
            ...like,
            item: ItemFilterUtils.filterResponseData(like.item, lang),
        }));

        return listLike;
    }

    async setLike(currentAccount: Account, body: any) {
        const { itemId } = body;
        const like = await this.likeRepository.findOne({
            where: { itemId: itemId, accountId: currentAccount.id },
        });
        
        if (like) {
            await this.likeRepository.delete({
                itemId: itemId,
                accountId: currentAccount.id,
            });
            return {
                message : this.i18n.t('success.like.create.fail'),
                like: like,
            };
        } else {
            var foundItem = await this.itemRepository.findOne({
                where: { id: itemId },
            });

            if (!foundItem) {
                return new NotFoundException(
                    this.i18n.t('error.item.itemNotFound', {
                        args: { itemId: itemId },
                    })
                );
            }

            const newLike = await this.likeRepository.save({
                accountId: currentAccount.id,
                itemId: itemId,
            });
            return {
                message : this.i18n.t('success.like.create.success'),
                like: newLike,
            };
        }
    }
}
