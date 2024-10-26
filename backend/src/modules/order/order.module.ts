import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Account,
    Cart,
    Item,
    ItemSize,
    Order,
    OrderDetail,
} from '../../entities';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AccountService } from '../account/account.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,
            OrderDetail,
            Account,
            Cart,
            Item,
            ItemSize,
        ]),
    ],
    controllers: [OrderController],
    providers: [OrderService, AuthGuard, AccountService],
    exports: [OrderService],
})
export class OrderModule {}
