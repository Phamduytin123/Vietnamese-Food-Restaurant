import { forwardRef, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CustomMailerService } from './mailer.service';
import { join } from 'path';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        // port: +process.env.MAIL_PORT,
        port: +process.env.MAIL_PORT,
        secure: false, // Đặt true nếu dùng SSL (port 465)
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <test-email@gmail.com>',
      },
      // template: {
      //   dir: join(__dirname, './templates'),
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    // AuthModule
    forwardRef(() => AuthModule),
  ],
  providers: [CustomMailerService],
  controllers: [AuthController],
  exports: [CustomMailerService]
})
export class CustomMailerModule { }
