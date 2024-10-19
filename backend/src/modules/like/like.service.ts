import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Like } from '../../entities';
import { Repository } from 'typeorm';
import { ItemFilterUtils } from '../../common';

@Injectable()
export class LikeService {
    constructor(@InjectRepository(Like) private readonly likeRepository : Repository<Like>){}

    async getListLike(currentAccount : Account, lang: string){
        const listLikeFound = await this.likeRepository.find({
            where : {accountId : currentAccount.id},
            relations : ["item"]
        })

        const listLike = listLikeFound.map(like=>({
            ...like,
            item : ItemFilterUtils.filterResponseData(like.item, lang)
        }))

        return listLike;
    }
}
