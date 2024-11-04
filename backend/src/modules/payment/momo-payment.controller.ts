import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MomoPaymentService } from './momo-payment.service';
import { AccountRoleEnum, CurrentAccount, Lang } from '../../common';
import { OrderRequest } from '../order/dtos/orderRequest';
import { Account } from '../../entities';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('momo-payment')
export class MomoPaymentController {
  constructor(private momoService: MomoPaymentService) {}
  @Post('/payment')
  @UseGuards(AuthGuard)
  async createPayment(
    @Lang() lang: string,
    @Body() orderRequest: OrderRequest,
    @CurrentAccount() currentAccount: Account
  ) {
    return await this.momoService.createPayment(
      lang,
      orderRequest,
      currentAccount
    );
  }
  @Post('/callback')
  async callback(@Req() req: any) {
    // Truyền request từ @Req() vào service

    return this.momoService.callback(req);
  }
  @Post('/check-status-transaction')
  async checkStatus(@Req() req: any) {
    return this.momoService.checkStatusTrans(req);
  }
}
