import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { RoleGuard } from '../../common/guards/role.guard';
import { AccountRoleEnum, CurrentAccount, Lang } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Account } from '../../entities';

@Controller('/carts')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    createCart(@Req() request: any, @CurrentAccount() currentAccount: Account) {
        return this.cartService.createCart(request, currentAccount);
    }

    @Get()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    async getListCart(
        @Lang() lang: string,
        @CurrentAccount() currentAccount: Account
    ) {
        return this.cartService.getListCart(lang, currentAccount);
    }

    @Put("/:id")
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    async updateCart(
        @Body() body: any,
        @Param('id') id : number,
        @CurrentAccount() currentAccount: Account
    ) {
        return this.cartService.updateCart(body, id, currentAccount);
    }

    @Delete("/:id")
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    async deleteCart(
        @Param('id') id : number,
        @CurrentAccount() currentAccount: Account
    ) {
        return this.cartService.deleteCart(id, currentAccount);
    }
}
