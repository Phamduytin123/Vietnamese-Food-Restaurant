import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Lang } from '../../common';
import { LoggingInterceptor } from '../../common/interceptors';

@Controller('/categories')
@UseInterceptors(LoggingInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getListCategory(@Lang() lang: string, @Query() query: any): any {
    return this.categoryService.getListCategory(lang, query);
  }
}
