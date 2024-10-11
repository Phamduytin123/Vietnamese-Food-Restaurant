import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/loginDtio';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
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
}
