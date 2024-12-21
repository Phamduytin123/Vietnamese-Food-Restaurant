import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item, LikeItem } from '../../entities';
import { In, Like, MoreThan, Repository } from 'typeorm';
import { clean, ItemFilterUtils, OrTypeOrm } from '../../common';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
    @InjectRepository(LikeItem)
    private readonly likeRepository: Repository<LikeItem>
  ) {}

  async getListItem(account: any, lang: string, query: any) {
    var {
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
      txtSearch,
      isFood = 'true',
      sortBy = 'name',
      sortOrder = 'ASC',
      isDiscount,
      categoryId,
    } = query;

    page = isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10);
    limit = isNaN(parseInt(limit, 10)) ? 12 : parseInt(limit, 10);
    minPrice = minPrice ? parseFloat(minPrice) : undefined;
    maxPrice = maxPrice ? parseFloat(maxPrice) : undefined;
    isFood = isFood.toLowerCase() === 'true';

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
      discount: isDiscount
        ? (isDiscount.toLowerCase() === 'true' && MoreThan(0))
        : null,
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
          (!minPrice || itemMinPrice >= minPrice) &&
          (!maxPrice || itemMaxPrice <= maxPrice)
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

    // nếu có account thì thêm like
    if (account) {
      const likedList = await this.likeRepository.find({
        where: { accountId: account.id },
      });

      filterItems = filterItems.map((item: any) => ({
        ...item,
        isLike: likedList.some(like => like.itemId === item.id),
      }));
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
          'itemSizes.reviews',
          'itemSizes.reviews.account',
        ],
        order: {
          itemSizes: {
            reviews: {
              updatedAt: 'DESC',
              createdAt: 'DESC',
            },
          },
        },
      });

      if (!itemDetail) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      const filterItem = ItemFilterUtils.filterResponseData(itemDetail, lang);

      // Flatten the reviews to be directly under the item
      const reviews = itemDetail.itemSizes.flatMap(itemSize =>
        itemSize.reviews.map(review => {
          const { password, role, ...restAccountReview } = review.account;
          return {
            ...review,
            account: restAccountReview,
          };
        })
      );

      return {
        ...filterItem,
        reviews,
      };
    } catch (error: any) {
      return {
        statusCode: error?.status || 500,
        message: error?.message || 'Internal server error',
      };
    }
  }

  async getListItemsByIds(lang: string, listIds: number[]) {
    try {
      // Kiểm tra nếu listIds không phải là một mảng hoặc rỗng
      if (listIds.length === 0) {
        throw new BadRequestException('List of IDs must be a non-empty array');
      }

      // Tìm các item dựa trên danh sách ID
      const items = await this.itemRepo.find({
        where: {
          id: In(listIds),
          isDeleted: false, // Giả sử điều kiện không lấy các item đã bị xóa
        },
        relations: ['category', 'itemSizes'],
      });

      // Nếu không tìm thấy item nào, ném lỗi NotFoundException
      if (!items || items.length === 0) {
        throw new NotFoundException('Items not found with the provided IDs');
      }

      // Áp dụng filter để lấy dữ liệu theo ngôn ngữ
      const filterItems = items.map(item =>
        ItemFilterUtils.filterResponseData(item, lang)
      );

      return filterItems;
    } catch (error: any) {
      return {
        statusCode: error?.status || 500,
        message: error?.message || 'Internal server error',
      };
    }
  }

  async getItemByName(lang: string, name: string) {
    try {
      // Kiểm tra nếu name không hợp lệ
      if (!name) {
        throw new BadRequestException('Name must be provided');
      }

      // Tìm item dựa trên tên (name_en)
      const nameField = `name_en`; // Giả sử trường ngôn ngữ là dạng name_en hoặc name_vi, etc.
      const item = await this.itemRepo.findOne({
        where: {
          [nameField]: name,
          isDeleted: false, // Giả sử điều kiện không lấy các item đã bị xóa
        },
        relations: ['category', 'itemSizes'],
      });

      // Nếu không tìm thấy item nào, ném lỗi NotFoundException
      if (!item) {
        throw new NotFoundException(`Item not found with name: ${name}`);
      }

      // Áp dụng filter để lấy dữ liệu theo ngôn ngữ
      const filteredItem = ItemFilterUtils.filterResponseData(item, lang);

      return filteredItem;
    } catch (error: any) {
      return {
        statusCode: error?.status || 500,
        message: error?.message || 'Internal server error',
      };
    }
  }
}
