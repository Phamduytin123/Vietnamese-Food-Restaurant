import { ZaloPaymentService } from './zaloPayment.service';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AccountRoleEnum, Lang } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { OrderRequest } from '../order/dtos/orderRequest';

@Controller('payment/zalo')
export class ZaloPaymentController {
    constructor(private readonly ZaloPaymentService: ZaloPaymentService) {}

    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    @Post('/payment')
    async createPayment(
        @Lang() lang: string,
        @Body() orderRequest: OrderRequest,
        @Req() req: any
    ) {
        return await this.ZaloPaymentService.createPayment(
            lang,
            orderRequest,
            req
        );
    }

    @Post('/callback')
    async callbackPayment(@Body() body: any) {
        return await this.ZaloPaymentService.handleZaloCallback(body);
    }

    @Get('/order-status/:app_trans_id')
    async checkOrderStatus(@Param('app_trans_id') app_trans_id: string) {
        return await this.ZaloPaymentService.queryPayment(app_trans_id);
    }
}
