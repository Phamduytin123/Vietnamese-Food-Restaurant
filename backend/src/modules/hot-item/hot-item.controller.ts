import { HotItemService } from './hot-item.service';
import { Controller, Get } from '@nestjs/common';
import { Lang } from '../../common';

@Controller('hot-item')
export class HotItemController {
  constructor(private readonly hotItemService: HotItemService) {}

  @Get()
  getListItem(@Lang() lang: string) {
    return this.hotItemService.getListHotItem(lang);
  }
}
