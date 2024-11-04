import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ZaloPaymentService } from './zalo-payment.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { JwtMiddleware } from '../../common';
import { AccountService } from '../account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Account,
  Cart,
  Item,
  ItemSize,
  Order,
  OrderDetail,
  Voucher,
} from '../../entities';
import { OrderService } from '../order/order.service';
import { MomoPaymentController } from './momo-payment.controller';
import { MomoPaymentService } from './momo-payment.service';
import { ZaloPaymentController } from './zalo-payment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      Account,
      Cart,
      Item,
      ItemSize,
      Voucher,
    ]),
  ],
  controllers: [ZaloPaymentController, MomoPaymentController],
  providers: [
    ZaloPaymentService,
    AuthGuard,
    AccountService,
    OrderService,
    MomoPaymentService,
  ],
  exports: [MomoPaymentService, ZaloPaymentService],
})
export class PaymentModule {}
