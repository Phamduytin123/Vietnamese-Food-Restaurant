import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { LoginDto } from './dtos/loginDtio';
import { AuthService } from './auth.service';
import { CustomMailerService } from '../mailer/mailer.service';
import { RegisterDto } from './dtos/registerDto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService,
        private customMailerService: CustomMailerService
    ) { }

    @Post('/login')
    loginUser(@Body() requestBody: LoginDto) {
        return this.authService.login(requestBody);
    }

    @Post('/register')
    async registerUser(@Body() registerDto: RegisterDto) {
        const result = await this.authService.registerAccount(registerDto);

        // Gửi email xác minh sau khi đăng ký thành công
        await this.customMailerService.sendVerificationEmail(result.email, result.verificationLink);

        return { message: 'Registration successful! Please verify your email.', verificationLink: result.verificationLink };
    }



    @Post('/reset-password')
    async resetPassword(@Body('email') email: string) {
        const result = await this.authService.sendPasswordReset(email);

        // Gửi email reset mật khẩu sau khi yêu cầu
        await this.customMailerService.sendPasswordResetEmail(result.email, result.resetLink);

        return { message: 'Password reset link sent to your email.', resetLink: result.resetLink };
    }

    @Get('verify')
    async verifyEmail(@Query('token') token: string) {
        console.log('verify');
        console.log(token);

        try {
            return await this.authService.verifyEmail(token);
        } catch (error) {
            return new Error('Invalid or expired token');
        }
    }

    @Get('/get-reset-password')
    async getResetPassword(@Query('token') token: string) {
        const result = await this.authService.resetPassword(token);
        return result;
    }
}
