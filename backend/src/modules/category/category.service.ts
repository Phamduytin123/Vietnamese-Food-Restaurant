import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async getListCategory(lang: string, query: any) {
    let { isFood = null } = query;

    if (isFood !== null) {
      isFood = isFood.toLowerCase() === 'true';
    }

    const queryBuilder = this.categoryRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.items', 'items');

    if (isFood !== null) {
      queryBuilder.where('category.isFood = :isFood', { isFood });
    }

    const [categories, categoriesCount] = await queryBuilder.getManyAndCount();

    const filterCategory: any = categories.map(category => ({
      id: category.id,
      isFood: category.isFood,
      name: category[`name_${lang}`],
      numberOfFood: category.items.length,
      image: category.url,
    }));

    const filterHotDeal: any = categories.map(category => ({
      id: category.id,
      isFood: category.isFood,
      name: category[`name_${lang}`],
      numberOfFood: category.items.filter(value => value.discount > 0).length,
    }));

    return {
      categories: {
        categories: filterCategory,
        totalCategories: categoriesCount,
      },
      hotDeals: {
        hotDeals: filterHotDeal,
        totalHotDeals: categoriesCount,
      },
    };
  }
}
