import { Module } from '@nestjs/common';
import { AdminOrderService } from './order.service';
import { AdminOrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    Account,
    Cart,
    Item,
    ItemSize,
    Order,
    OrderDetail,
} from '../../../entities';
import { AccountService } from '../../../modules/account/account.service';
import { AuthGuard } from '../../../common/guards/auth.guard';

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
    providers: [AdminOrderService, AuthGuard, AccountService],
    controllers: [AdminOrderController],
})
export class AdminOrderModule {}
