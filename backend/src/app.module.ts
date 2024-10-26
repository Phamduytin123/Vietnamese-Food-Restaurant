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
import { OrderModule } from './modules/order/order.module';
import {
    I18nModule,
    HeaderResolver,
    QueryResolver,
    AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { RecipeModule } from './modules/recipe/recipe.module';
import { CustomMailerModule } from './modules/mailer/mailer.module';
import { LikeModule } from './modules/like/like.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { ReviewModule } from './modules/review/review.module';
import { RevenueModule } from './modules/revenue/revenue.module';
import { UploadModule } from './modules/upload/upload.module';
import { CloudinaryConfig } from './common/config/cloudinary.config';
import { AdminItemModule } from './modules/admin/item/item.module';
import { AdminOrderModule } from './modules/admin/order/order.module';
@Module({
    imports: [
        DatabaseModule,
        AccountModule,
        ItemModule,
        CategoryModule,
        AuthModule,
        PaymentModule,
        RecipeModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CartModule,
        OrderModule,
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: true,
            },
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
                new HeaderResolver(['x-lang']),
            ],
        }),
        CustomMailerModule,
        LikeModule,
        VoucherModule,
        ReviewModule,
        RevenueModule,
        UploadModule,
        ConfigModule.forRoot(),
        AdminItemModule,
        AdminOrderModule,
    ],
    controllers: [AppController],
    providers: [AppService, CloudinaryConfig],
    exports: [CloudinaryConfig],
})
export class AppModule {}
