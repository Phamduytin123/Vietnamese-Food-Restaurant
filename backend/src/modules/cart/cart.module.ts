import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Cart, ItemSize } from '../../entities';
import { JwtMiddleware } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AccountService } from '../account/account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, ItemSize, Account])],
    controllers: [CartController],
    providers: [CartService, AuthGuard, AccountService],
})
export class CartModule {}
