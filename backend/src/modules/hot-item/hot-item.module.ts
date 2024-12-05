import { Module } from '@nestjs/common';
import { HotItemController } from './hot-item.controller';
import { HotItemService } from './hot-item.service';
import { Item, Review } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Review])],
  controllers: [HotItemController],
  providers: [HotItemService],
})
export class HotItemModule {}
