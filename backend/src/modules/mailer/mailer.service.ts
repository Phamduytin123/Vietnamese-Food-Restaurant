import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { profileEnd } from 'console';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomMailerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}
  async sendVerificationEmail(email: string, verificationLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify Your Email',
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
    });
  }

  async sendVerificationPasswordResetEmail(email: string, resetLink: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      text: `You can get your reset password by clicking the following link: ${resetLink}`,
    });
  }
  async sendPasswordReset(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      text: 'Your password has been reset to 88888888',
    });
  }
}
