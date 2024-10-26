import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item, ItemSize, LikeItem } from '../../entities';

@Module({
    imports: [TypeOrmModule.forFeature([Item, ItemSize, LikeItem])],
    providers: [ItemService],
    controllers: [ItemController],
    exports: [ItemService],
})
export class ItemModule {}
