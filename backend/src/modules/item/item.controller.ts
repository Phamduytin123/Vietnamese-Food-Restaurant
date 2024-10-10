import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Lang } from '../../common';

@Controller('/items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    getListItem(@Lang() lang: string, @Query() query: any) {
        return this.itemService.getListItem(lang, query);
    }

    @Get('/:id')
    getItemDetail(@Lang() lang: string, @Param('id') id: number) {
        return this.itemService.getItemDetail(lang, id);
    }
}
