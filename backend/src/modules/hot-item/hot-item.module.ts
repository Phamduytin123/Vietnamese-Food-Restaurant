import { Module } from '@nestjs/common';
import { HotItemController } from './hot-item.controller';
import { HotItemService } from './hot-item.service';
import { Item } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [HotItemController],
  providers: [HotItemService],
})
export class HotItemModule {}
