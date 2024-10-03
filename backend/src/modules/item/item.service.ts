import { Category } from './../../entities/category.entity';
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, ItemSize } from '../../entities';
import {
    Between,
    In,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Repository,
} from 'typeorm';
import { clean } from '../../common/utils/clean.utils';
import { OrTypeOrm } from '../../common/utils/OrTypeorm.utils';
import { StringUtils } from '../../common/utils/string.utils';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
        @InjectRepository(ItemSize)
        private readonly itemSizeRepo: Repository<ItemSize>
    ) {}

    async getListItem(@Body() body: any) {
        const {
            page = 1,
            limit = 12,
            minPrice,
            maxPrice,
            txtSearch,
            isFood = true,
            sortBy = 'name',
            lang = 'vi',
            sortOrder = 'ASC',
            isDiscount = false,
            categoryId,
        } = body;

        // Paging
        const skip = (page - 1) * limit;

        // Order
        const orderField = sortBy === 'name' ? `${sortBy}_${lang}` : sortBy;

        const order = {};
        order[orderField] = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // Conditions
        const nameField = `name_${lang}`;
        const descriptionField = `description_${lang}`;
        const ingredientsField = `ingredients_${lang}`;
        const regionalField = `regional_${lang}`;
        const unitField = `unit_${lang}`;

        const conditionsItemSize: any = clean({
            price:
                maxPrice && minPrice
                    ? Between(minPrice, maxPrice)
                    : maxPrice
                      ? LessThanOrEqual(maxPrice)
                      : minPrice && MoreThanOrEqual(minPrice),
        });

        const itemSizes = await this.itemSizeRepo.find(
            clean({
                where: conditionsItemSize,
            })
        );

        const itemSizeIds = itemSizes.map(itemSize => itemSize.id);

        var conditions: any = clean({
            categoryId: categoryId,
            isFood: isFood,
            id: itemSizeIds.length > 0 ? In(itemSizeIds) : -1,
            isDeleted: false,
            discount: isDiscount && MoreThan(0),
        });

        if (txtSearch) {
            const searchConditions = {
                [nameField]: Like(`%${txtSearch}%`),
                [descriptionField]: Like(`%${txtSearch}%`),
                [ingredientsField]: Like(`%${txtSearch}%`),
                [regionalField]: Like(`%${txtSearch}%`),
            };

            conditions = OrTypeOrm(searchConditions, conditions);
        }

        var [items, totalItems] = await this.itemRepo.findAndCount(
            clean({
                where: conditions,
                skip: skip,
                take: limit,
                order: orderField !== 'price' && order,
                relations: ['category', 'itemSizes'],
            })
        );

        // filter data
        var filterItems: any = items.map(item => {
            const {
                name_vi,
                name_en,
                description_vi,
                description_en,
                ingredients_vi,
                ingredients_en,
                unit_en,
                unit_vi,
                regional_en,
                regional_vi,
                images,
                ...restItem
            } = item;

            var min = Infinity;
            var max = -1;

            item.itemSizes.forEach(itemSize => {
                min = min > itemSize.price ? itemSize.price : min;
                max = max < itemSize.price ? itemSize.price : max;
            });

            return {
                name: item[nameField],
                images: StringUtils.toArray(item.images),
                description: item[descriptionField],
                ingredients: StringUtils.toArray(item[ingredientsField]),
                unit: item[unitField],
                regional: item[regionalField],
                ammount_of_money: `${min}-${max}`,
                minPrice: min,
                maxPrice: max,
                ...restItem,
                category: {
                    id: item.category.id,
                    name: item.category[nameField],
                    isFood: item.category.isFood,
                },
                itemSizes: item.itemSizes.map(itemSize => ({
                    id: itemSize.id,
                    size: itemSize[`size_${lang}`],
                    price: itemSize.price,
                    itemId: itemSize.itemId,
                })),
            };
        });

        // sort data by price
        if (sortBy === 'price') {
            filterItems = filterItems.sort((a: any, b: any) => {
                if (sortOrder.toUpperCase() === 'ASC') {
                    return a.maxPrice - b.maxPrice;
                } else {
                    return b.minPrice - a.minPrice;
                }
            });
        }

        return {
            items: filterItems,
            totalItems: totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
        };
    }
}
