import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Lang } from '../../common';
import * as jwt from 'jsonwebtoken';
import { LoggingInterceptor } from '../../common/interceptors';

@Controller('/items')
@UseInterceptors(LoggingInterceptor)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  getAccountFromToken(token: string) {
    return token ? jwt.verify(token, process.env.JWT_SECRET) : null;
  }

  @Get()
  getListItem(@Lang() lang: string, @Query() query: any, @Req() req: any) {
    const authHeader = req.headers.authorization;
    let currentAccount = null;
    // Kiểm tra xem header có tồn tại và định dạng có đúng không
    if (
      authHeader &&
      authHeader.startsWith('Bearer ') &&
      authHeader.split(' ')[1] != 'null'
    ) {
      const token = authHeader.split(' ')[1];
      currentAccount = this.getAccountFromToken(token);
    }
    return this.itemService.getListItem(currentAccount, lang, query);
  }

  @Get('/:id')
  getItemDetail(@Lang() lang: string, @Param('id') id: number) {
    return this.itemService.getItemDetail(lang, id);
  }
}
