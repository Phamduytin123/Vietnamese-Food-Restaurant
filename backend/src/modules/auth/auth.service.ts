import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/loginDtio';
import { CustomMailerService } from '../mailer/mailer.service';
import { RegisterDto } from './dtos/registerDto';
import { PasswordUtils } from '../../common';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../entities';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>,
        private accountService: AccountService,
        private jwtService: JwtService,
        private readonly customMailerService: CustomMailerService
    ) {}

    async login(requestBody: LoginDto) {
        //check email exist
        const accountByEmail = await this.accountService.findByEmail(
            requestBody.email
        );
        if (!accountByEmail) {
            throw new BadRequestException('Invalid Credentials!');
        }

        //check password
        const isMatchPassword = await bcrypt.compare(
            requestBody.password,
            accountByEmail.password
        );
        if (!isMatchPassword) {
            throw new BadRequestException('Invalid Credentials!');
        }
        //generate jwt token
        const payload = {
            id: accountByEmail.id,
            name: accountByEmail.name,
            address: accountByEmail.address,
            email: accountByEmail.email,
            role: accountByEmail.role,
        };

        const acess_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });

        return {
            msg: 'User has been login successfully!',
            acess_token,
            name: accountByEmail.name,
            displayName: accountByEmail.displayName,
            address: accountByEmail.address,
            email: accountByEmail.email,
            tel: accountByEmail.tel,
            avatar: accountByEmail.avatar,
            gender: accountByEmail.gender,
            role: accountByEmail.role,
        };
    }

    async registerAccount(accountData: RegisterDto) {
        accountData.password = PasswordUtils.hashPassword(accountData.password);
        // const newAccount = await this.accountService.create(accountData);

        const verificationToken = await this.jwtService.signAsync(
            { newAccount: accountData },
            { secret: process.env.JWT_SECRET, expiresIn: '1d' }
        );

        const verificationLink = `http://localhost:8000/auth/verify?token=${verificationToken}`;

        // Gửi email xác minh qua MailerService
        // await this.customMailerService.sendVerificationEmail(newAccount.email, verificationLink);

        return { email: accountData.email, verificationLink };
    }
    async verifyEmail(token: string) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
        });
        console.log(payload.newAccount.email);

        const user = await this.accountService.create(payload.newAccount);
        if (!user) {
            return new UnauthorizedException('User not found');
        }

        // // Cập nhật trạng thái xác minh của người dùng
        // user.isVerified = true; // Hoặc trường tương ứng trong mô hình của bạn
        // await this.userService.update(user.id, user); // Cập nhật thông tin người dùng

        return user; // Hoặc trả về thông tin cần thiết
    }
    async sendPasswordReset(email: string) {
        const account = await this.accountService.findByEmail(email);
        if (!account) {
            throw new BadRequestException('Email not found!');
        }

        const resetToken = await this.jwtService.signAsync(
            { email: account.email },
            { secret: process.env.JWT_SECRET, expiresIn: '1h' }
        );

        const resetLink = `http://localhost:8000/auth/get-reset-password?token=${resetToken}`;

        // Gửi email reset mật khẩu qua MailerService
        // await this.customMailerService.sendPasswordResetEmail(account.email, resetLink);

        return { email: account.email, resetLink };
    }
    async resetPassword(token: string) {
        // Xác minh token
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
        });

        if (!payload) {
            throw new UnauthorizedException('Invalid token or email');
        }

        // Tìm tài khoản bằng email
        const account = await this.accountService.findByEmail(payload.email);
        if (!account) {
            throw new BadRequestException('Email not found!');
        }

        // Đặt mật khẩu mới thành "88888888"
        account.password = PasswordUtils.hashPassword('88888888');

        // Cập nhật thông tin tài khoản
        await this.accountRepo.update(account.id, account);

        return {
            message: 'Password has been reset successfully.',
            emailreset: account.email,
        };
    }
}
