import { HotItemService } from './hot-item.service';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Lang } from '../../common';
import { LoggingInterceptor } from '../../common/interceptors';

@Controller('hot-item')
@UseInterceptors(LoggingInterceptor)
export class HotItemController {
  constructor(private readonly hotItemService: HotItemService) {}

  @Get()
  getListItem(@Lang() lang: string) {
    return this.hotItemService.getListHotItem(lang);
  }
}
