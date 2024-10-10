import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { RoleGuard } from '../../common/guards/role.guard';
import { AccountRoleEnum, CurrentAccount } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Account } from '../../entities';

@Controller('/:lang/cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    createCart(@Req() request: any,  @CurrentAccount() currentAccount : Account) {
        return this.cartService.createCart(request, currentAccount);
    }

    @Get()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    async getListCart(@Param('lang') lang: string, @CurrentAccount() currentAccount : Account) {
        return this.cartService.getListCart(lang, currentAccount);
    }
}
