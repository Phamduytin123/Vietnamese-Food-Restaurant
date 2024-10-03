import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './common/config/database.config.module';
import { ItemModule } from './modules/item/item.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
    imports: [DatabaseModule, AccountModule, ItemModule, CategoryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
