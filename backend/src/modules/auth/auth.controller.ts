import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/loginDtio';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('/login')
    loginUser(@Body() requestBody: LoginDto) {
        return this.authService.login(requestBody)
    }
}
