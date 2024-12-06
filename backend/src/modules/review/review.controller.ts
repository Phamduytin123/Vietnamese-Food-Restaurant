import { AuthGuard } from '../../common/guards/auth.guard';
import { ReviewService } from './review.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccountRoleEnum, CurrentAccount } from '../../common';
import { RoleGuard } from '../../common/guards/role.guard';
import { Account } from '../../entities';
import { ReviewRequest } from './dtos/ReviewRequest';
import { LoggingInterceptor } from '../../common/interceptors';

@Controller('reviews')
@UseInterceptors(LoggingInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('')
  @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
  @UseGuards(AuthGuard)
  async createReview(
    @CurrentAccount() account: Account,
    @Body() body: ReviewRequest
  ) {
    return this.reviewService.createReview(account, body);
  }
}
