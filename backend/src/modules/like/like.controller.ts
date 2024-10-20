import { RoleGuard } from '../../common/guards/role.guard';
import { AccountRoleEnum, CurrentAccount, Lang } from '../../common';
import { Account } from '../../entities';
import { LikeService } from './like.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('likes')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Get()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    getListLike(
        @CurrentAccount() currentAccount: Account,
        @Lang() lang: string
    ) {
        return this.likeService.getListLike(currentAccount, lang);
    }

    @Post()
    @UseGuards(new RoleGuard([AccountRoleEnum.CUSTOMER]))
    @UseGuards(AuthGuard)
    setLike(@CurrentAccount() currentAccount: Account, @Body() body: any) {
        return this.likeService.setLike(currentAccount, body);
    }
}
