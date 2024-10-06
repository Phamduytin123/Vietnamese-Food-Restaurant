import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from '../../modules/account/account.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
