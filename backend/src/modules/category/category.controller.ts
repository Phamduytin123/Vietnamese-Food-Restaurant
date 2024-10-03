import { Body, Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    getListCategory(@Body() body: any): any {
        return this.categoryService.getListCategory(body);
    }
}
