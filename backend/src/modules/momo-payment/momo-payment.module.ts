import { Module } from '@nestjs/common';
import { MomoPaymentController } from './momo-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Cart, Item, ItemSize, Order, OrderDetail } from '../../entities';
import { MomoPaymentService } from './momo-payment.service';
import { OrderModule } from '../order/order.module';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AccountService } from '../account/account.service';
import { OrderService } from '../order/order.service';

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
        OrderModule
    ],
    controllers: [MomoPaymentController],
    providers: [MomoPaymentService, AuthGuard, AccountService, OrderService],
    exports: [MomoPaymentService]
})
export class MomoPaymentModule { }
