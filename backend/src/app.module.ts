import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './common/config/database.config.module';

@Module({
    imports: [DatabaseModule, AccountModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
