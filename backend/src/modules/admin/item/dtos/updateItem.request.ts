import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ItemAvailabilityEnum } from '../../../../common';
import { ItemSize } from '../../../../entities';

export class UpdateItemReq {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.item_id_required'),
  })
  id: number;
  @IsOptional()
  //     {
  //     message: i18nValidationMessage('validation.item.name_en_required'),
  // }
  name_en: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.name_vi_required'),
  })
  name_vi: string;

  @IsOptional()
  discount: number = 0;

  @IsOptional()
  images: string;

  @IsOptional()
  calories: number = 0;

  @IsOptional()
  fat: number = 0;

  @IsOptional()
  carbohydrates: number = 0;

  @IsOptional()
  protein: number = 0;

  @IsOptional()
  cholesterol: number = 0;

  @IsOptional()
  sodium: number = 0;

  @IsOptional()
  fiber: number = 0;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.categoryId_required'),
  })
  categoryId: number = 0;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.description_vi_required'),
  })
  description_vi: string;

  @IsOptional()
  //     {
  //     message: i18nValidationMessage('validation.item.description_en_required'),
  //   }
  description_en: string;

  @IsOptional()
  @IsEnum(ItemAvailabilityEnum, {
    message: i18nValidationMessage('validation.item.availability_invalid'),
  })
  availability: ItemAvailabilityEnum = ItemAvailabilityEnum.IN_STOCK;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.ingredients_vi_required'),
  })
  ingredients_vi: string;

  @IsOptional()
  //     {
  //     message: i18nValidationMessage('validation.item.ingredients_en_required'),
  //   }
  ingredients_en: string;

  @IsOptional()
  // {
  //   message: i18nValidationMessage('validation.item.unit_vi_required'),
  // }
  unit_vi: string;

  @IsOptional()
  //     {
  //     message: i18nValidationMessage('validation.item.unit_en_required'),
  //   }
  unit_en: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.regional_vi_required'),
  })
  regional_vi: string;

  @IsOptional()
  //     {
  //     message: i18nValidationMessage('validation.item.regional_en_required'),
  //   }
  regional_en: string;

  @IsNotEmpty({
    message: i18nValidationMessage('validation.item.itemSizes_required'),
  })
  itemSizes: string;
}
