import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Item, ItemSize } from '../../../entities';
import { Repository } from 'typeorm';
import { CreateItemReq } from './dtos/createItemReq';
import { I18nService } from 'nestjs-i18n';
import { UpdateItemReq } from './dtos/updateItem.request';
import { clean } from '../../../common';
import { find } from 'rxjs';
import { waitForDebugger } from 'inspector';

@Injectable()
export class AdminItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemSize)
    private readonly itemSizeRepository: Repository<ItemSize>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly i18n: I18nService
  ) {}

  async createItem(body: CreateItemReq) {
    const {
      name_en,
      name_vi,
      discount,
      calories,
      itemSizes,
      fat,
      carbohydrates,
      protein,
      cholesterol,
      sodium,
      fiber,
      description_vi,
      description_en,
      availability,
      ingredients_vi,
      ingredients_en,
      unit_vi,
      unit_en,
      regional_vi,
      regional_en,
      isFood,
      categoryId,
      images,
    } = body;

    const itemSizesParse = JSON.parse(itemSizes);

    const categoryFound = this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!categoryFound) {
      return new NotFoundException(
        this.i18n.t('error.category.categoryNotFound', {
          args: { categoryId: categoryId },
        })
      );
    }

    const newItem = await this.itemRepository.save({
      name_en: name_en,
      name_vi: name_vi,
      discount: discount,
      calories: calories,
      fat: fat,
      carbohydrates: carbohydrates,
      protein: protein,
      cholesterol: cholesterol,
      sodium: sodium,
      fiber: fiber,
      description_vi: description_vi,
      description_en: description_en,
      availability: availability,
      rating: 5,
      ingredients_vi: ingredients_vi,
      ingredients_en: ingredients_en,
      unit_vi: unit_vi,
      unit_en: unit_en,
      images: images,
      regional_vi: regional_vi,
      regional_en: regional_en,
      isFood: isFood === 'true',
      categoryId: categoryId,
    });

    const newItemSizes = [];

    for (const itemSize of itemSizesParse) {
      const { size_en, size_vi, price } = itemSize;

      const savedItemSize = await this.itemSizeRepository.save({
        size_en: size_en,
        size_vi: size_vi,
        price: price,
        itemId: newItem.id,
      });

      newItemSizes.push(savedItemSize);
    }

    return {
      ...newItem,
      itemSizes: newItemSizes,
    };
  }
  async updateItem(body: UpdateItemReq) {
    const {
      id,
      name_en,
      name_vi,
      discount,
      calories,
      itemSizes,
      fat,
      carbohydrates,
      protein,
      cholesterol,
      sodium,
      fiber,
      description_vi,
      description_en,
      availability,
      ingredients_vi,
      ingredients_en,
      unit_vi,
      unit_en,
      regional_vi,
      regional_en,
      categoryId,
      images,
    } = body;

    const itemSizesParse = JSON.parse(itemSizes);
    const existingItem = await this.itemRepository.findOneBy({ id });

    if (!existingItem) {
      return new NotFoundException(
        this.i18n.t('error.item.itemNotFound', {
          args: { itemId: id },
        })
      );
    }

    const categoryFound = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!categoryFound) {
      return new NotFoundException(
        this.i18n.t('error.category.categoryNotFound', {
          args: { categoryId: categoryId },
        })
      );
    }

    const filterItem = clean({
      name_en,
      name_vi,
      discount,
      calories,
      fat,
      carbohydrates,
      protein,
      cholesterol,
      sodium,
      fiber,
      description_vi,
      description_en,
      availability,
      ingredients_vi,
      ingredients_en,
      unit_vi,
      unit_en,
      images: images,
      regional_vi,
      regional_en,
      categoryId,
    });

    const newItem = {
      ...existingItem,
      ...filterItem,
    };

    const updateItem = await this.itemRepository.save(newItem);

    // Lấy danh sách `itemSizes` hiện tại từ cơ sở dữ liệu
    const existingItemSizes = await this.itemSizeRepository.find({
      where: { itemId: existingItem.id },
    });

    const newItemSizes = [];
    const itemSizeIdsToKeep = itemSizesParse.map(
      (itemSize: any) => itemSize.id
    );

    // Xử lý cập nhật hoặc tạo mới các `itemSizes`
    for (const itemSize of itemSizesParse) {
      const { id, size_en, size_vi, price } = itemSize;
      let savedItemSize: any;
      if (id) {
        const findItemSize = await this.itemSizeRepository.findOneBy({ id });
        if (!findItemSize) {
          return new NotFoundException(
            this.i18n.t('error.item.itemSizeNotFound', {
              args: { itemId: id },
            })
          );
        }
        findItemSize.size_en = size_en ? size_en : findItemSize.size_en;
        findItemSize.size_vi = size_vi ? size_vi : findItemSize.size_vi;
        findItemSize.price = price ?? findItemSize.price;
        savedItemSize = await this.itemSizeRepository.save(findItemSize);
      } else {
        savedItemSize = await this.itemSizeRepository.save({
          size_en: size_en,
          size_vi: size_vi,
          price: price,
          itemId: existingItem.id,
        });
      }

      newItemSizes.push(savedItemSize);
    }

    // Xóa các `itemSizes` không tồn tại trong danh sách được truyền vào
    for (const existingSize of existingItemSizes) {
      if (!itemSizeIdsToKeep.includes(existingSize.id)) {
        await this.itemSizeRepository.remove(existingSize);
      }
    }

    return {
      ...updateItem,
      itemSizes: newItemSizes,
    };
  }
}
