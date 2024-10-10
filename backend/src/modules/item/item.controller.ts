import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('/:lang/items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    getListItem(@Param('lang') lang: string, @Query() query: any) {
        return this.itemService.getListItem(lang, query);
    }

    @Get('/:id')
    getItemDetail(@Param('lang') lang: string, @Param('id') id: number) {
        return this.itemService.getItemDetail(lang, id);
    }
}
