import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Lang } from '../../common';

@Controller('/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getListCategory(@Lang() lang: string, @Query() query: any): any {
    return this.categoryService.getListCategory(lang, query);
  }
}
