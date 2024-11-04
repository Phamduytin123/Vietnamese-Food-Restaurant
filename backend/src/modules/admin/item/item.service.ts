import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Item, ItemSize } from '../../../entities';
import { Repository } from 'typeorm';
import { CreateItemReq } from './dtos/createItemReq';
import { I18nService } from 'nestjs-i18n';

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

  async createItem(images: any, body: CreateItemReq) {
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
      images: JSON.stringify(images),
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
}
