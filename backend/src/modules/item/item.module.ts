import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item, ItemSize } from '../../entities';

@Module({
    imports: [TypeOrmModule.forFeature([Item, ItemSize])],
    providers: [ItemService],
    controllers: [ItemController],
})
export class ItemModule {}
