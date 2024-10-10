import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
import { clean, ItemFilterUtils, OrTypeOrm, StringUtils } from '../../common';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
        @InjectRepository(ItemSize)
        private readonly itemSizeRepo: Repository<ItemSize>
    ) {}

    async getListItem(lang: string, query: any) {
        var {
            page = 1,
            limit = 12,
            minPrice,
            maxPrice,
            txtSearch,
            isFood = true,
            sortBy = 'name',
            sortOrder = 'ASC',
            isDiscount = false,
            categoryId,
        } = query;

        page = isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10);
        limit = isNaN(parseInt(limit, 10)) ? 12 : parseInt(limit, 10);
        minPrice = minPrice ? parseFloat(minPrice) : undefined;
        maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
        isFood = isFood.toLowerCase() === 'true';
        isDiscount = isDiscount.toLowerCase() === 'true';

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

        var conditions: any = clean({
            categoryId: categoryId,
            isFood: isFood,
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

        var [items, _totalItems] = await this.itemRepo.findAndCount(
            clean({
                where: conditions,
                skip: skip,
                take: limit,
                order: orderField !== 'price' && order,
                relations: ['category', 'itemSizes'],
            })
        );

        // filter data
        var filterItems: any = items.map(item =>
            ItemFilterUtils.filterResponseData(item, lang)
        );

        // Lọc theo giá tiền
        if (minPrice || maxPrice) {
            filterItems = filterItems.filter((item: any) => {
                const itemMinPrice = parseFloat(
                    item.minPrice.replace(/\./g, '').replace(' VND', '')
                );
                const itemMaxPrice = parseFloat(
                    item.maxPrice.replace(/\./g, '').replace(' VND', '')
                );

                return (
                    (!minPrice || itemMaxPrice/1000 <= maxPrice) &&
                    (!maxPrice || itemMinPrice/1000 >= minPrice)
                );
            });
        }

        // sort data by price
        if (sortBy === 'price') {
            filterItems = filterItems.sort((a: any, b: any) => {
                const priceA = parseInt(
                    a.maxPrice.replace(/\./g, '').replace(' VND', ''),
                    10
                );
                const priceB = parseInt(
                    b.maxPrice.replace(/\./g, '').replace(' VND', ''),
                    10
                );

                if (sortOrder.toUpperCase() === 'ASC') {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            });
        }

        // Cập nhật lại totalItems sau khi lọc
        const totalItems = filterItems.length;

        // Tính toán lại số trang hiện tại nếu cần
        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = page > totalPages ? totalPages : page;

        return {
            items: filterItems.slice(skip, skip + limit),
            totalItems: totalItems,
            currentPage: currentPage,
            totalPages: totalPages,
        };
    }

    async getItemDetail(lang: string, id: number) {
        try {
            if (isNaN(id)) {
                throw new BadRequestException('ID must be a number');
            }

            const itemDetail = await this.itemRepo.findOne({
                where: { id },
                relations: [
                    'category',
                    'itemSizes',
                    'reviews',
                    'reviews.account',
                ],
            });

            if (!itemDetail) {
                throw new NotFoundException(`Item with ID ${id} not found`);
            }

            console.log(itemDetail.images)

            const filterItem = ItemFilterUtils.filterResponseData(
                itemDetail,
                lang
            );

            return {
                ...filterItem,
                reviews: itemDetail.reviews.map(review => {
                    const { password, role, ...restAccountReview } =
                        review.account;

                    return {
                        ...review,
                        account: restAccountReview,
                    };
                }),
            };
        } catch (error: any) {
            return {
                statusCode: error?.status || 500,
                message: error?.message || 'Internal server error',
            };
        }
    }
}
