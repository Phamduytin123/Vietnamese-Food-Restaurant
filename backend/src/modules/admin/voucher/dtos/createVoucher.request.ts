import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateVoucherDto {
  @IsNotEmpty()
  name_vi?: string;

  @IsNotEmpty()
  name_en?: string;

  @IsNotEmpty()
  code?: string;

  @IsNotEmpty()
  @Min(0, { message: i18nValidationMessage('validation.voucher.discount_min') })
  @Max(100, {
    message: i18nValidationMessage('validation.voucher.discount_max'),
  })
  discount?: number;

  @IsNotEmpty()
  @Min(0, { message: i18nValidationMessage('validation.voucher.minPrice_min') })
  minPrice?: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({
    message: i18nValidationMessage('validation.voucher.startAt_invalid'),
  })
  startAt?: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({
    message: i18nValidationMessage('validation.voucher.endAt_invalid'),
  })
  endAt?: Date;

  @IsNotEmpty()
  @Min(0, { message: i18nValidationMessage('validation.voucher.count_min') })
  count?: number;
}
