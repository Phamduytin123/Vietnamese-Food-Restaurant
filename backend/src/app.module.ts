import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './common/config/database.config.module';
import { ItemModule } from './modules/item/item.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './modules/cart/cart.module';
@Module({
    imports: [
        DatabaseModule,
        AccountModule,
        ItemModule,
        CategoryModule,
        AuthModule,
        PaymentModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CartModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
