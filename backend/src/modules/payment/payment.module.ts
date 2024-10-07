import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { ZaloPaymentController } from './zaloPayment.controller';
import { ZaloPaymentService } from './zaloPayment.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { JwtMiddleware } from '../../common';
import { AccountService } from '../account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    controllers: [ZaloPaymentController],
    providers: [ZaloPaymentService, AuthGuard, AccountService],
})
export class PaymentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({
            path: 'payment/zalo/payment',
            method: RequestMethod.POST,
        });
    }
}
