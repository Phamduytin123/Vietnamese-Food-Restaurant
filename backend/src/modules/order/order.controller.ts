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
  UseInterceptors,
} from '@nestjs/common';
import { AccountRoleEnum, CurrentAccount, Lang } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { Account } from '../../entities';
import { OrderRequest } from './dtos/orderRequest';
import { OrdersRequest } from './dtos/ordersRequest';
import { CusCancelRequest } from './dtos/cusCancelRequest';
import { UpdateStatusDto } from './dtos/updateStatusDto';
import { LoggingInterceptor } from '../../common/interceptors';

@Controller('/orders')
@UseInterceptors(LoggingInterceptor)
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
    @Query() query: OrdersRequest
  ) {
    return this.orderService.getOrders(lang, account, query);
  }

  @Get('/:id')
  @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
  @UseGuards(AuthGuard)
  async getOrderDetail(
    @Lang() lang: string,
    @Param('id') id: number,
    @CurrentAccount() account: Account
  ) {
    return this.orderService.getOrderDetail(lang, id, account);
  }

  @Post('/updateStatus')
  @UseGuards(new RoleGuard([AccountRoleEnum.STAFF, AccountRoleEnum.ADMIN]))
  @UseGuards(AuthGuard)
  async UpdateStatus(
    @Lang() lang: string,
    @Body() updateStatusRequest: UpdateStatusDto
  ) {
    return this.orderService.updateStatusOrder(lang, updateStatusRequest);
  }

  @Post('/cancel')
  @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
  @UseGuards(AuthGuard)
  async cancelOrder(
    @Lang() lang: string,
    @Body() cusCancelRequest: CusCancelRequest,
    @CurrentAccount() account: Account
  ) {
    return this.orderService.CancelOrderById(lang, cusCancelRequest, account);
  }
}
