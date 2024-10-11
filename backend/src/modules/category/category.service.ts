import { Body, Injectable } from '@nestjs/common';
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
        var { isFood = true } = query;

        isFood = isFood.toLowerCase() === 'true';

        const [categories, categoriesCount] =
            await this.categoryRepo.findAndCount({
                where: {
                    isFood: isFood,
                },
                relations: ['items'],
            });

        const filterCategory: any = categories.map(category => ({
            id: category.id,
            isFood: category.isFood,
            name: category[`name_${lang}`],
            numberOfFood: category.items.length,
        }));

        const filterHotDeal: any = categories.map(category => ({
            id: category.id,
            isFood: category.isFood,
            name: category[`name_${lang}`],
            numberOfFood: category.items.filter(value => value.discount > 0)
                .length,
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
