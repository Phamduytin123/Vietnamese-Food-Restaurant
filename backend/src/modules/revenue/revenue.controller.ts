import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RoleGuard } from '../../common/guards/role.guard';
import { AccountRoleEnum, Lang } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('revenue')
export class RevenueController {
    constructor(private readonly revenueService : RevenueService){}

    @Get()
    @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN]))
    @UseGuards(AuthGuard)
    async getOrder(
        @Lang() lang: string,
        @Query() query : any
    ) {
        return this.revenueService.getRevenue(lang, query);
    }
}
