import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RoleGuard } from '../../common/guards/role.guard';
import { AccountRoleEnum, Lang } from '../../common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { LoggingInterceptor } from '../../common/interceptors';

@Controller('revenue')
@UseInterceptors(LoggingInterceptor)
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  async getOrder(@Lang() lang: string, @Query() query: any) {
    return this.revenueService.getRevenue(lang, query);
  }
}
