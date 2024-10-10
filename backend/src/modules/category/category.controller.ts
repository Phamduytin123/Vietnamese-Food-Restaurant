import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('/:lang/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getListCategory(@Param('lang') lang: string, @Query() query: any): any {
        return this.categoryService.getListCategory(lang, query);
    }
}
