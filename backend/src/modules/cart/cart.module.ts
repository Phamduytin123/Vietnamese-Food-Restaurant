import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, ItemSize } from '../../entities';
import { JwtMiddleware } from '../../common';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, ItemSize])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes({
          path: 'cart',
          method: RequestMethod.POST,
      });
  }
}

