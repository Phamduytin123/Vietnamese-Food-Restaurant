import { OrderService } from './order.service';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { AccountRoleEnum, CurrentAccount, Lang } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { Account } from '../../entities';
import { OrderRequest } from './dtos/orderRequest';
import { OrdersRequest } from './dtos/ordersRequest';

@Controller('/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    async createOrder(
        @Lang() lang: string,
        @CurrentAccount() account: Account,
        @Body() orderReq: OrderRequest
    ) {
        return this.orderService.createOrder(lang, account, orderReq);
    }

    @Get()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    async getOrder(
        @Lang() lang: string,
        @CurrentAccount() account: Account,
        @Query() query: OrdersRequest,
    ) {
        return this.orderService.getOrders(lang, account, query);
    }
}
