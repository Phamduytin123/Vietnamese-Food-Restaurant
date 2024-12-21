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

export class UpdateVoucherDto {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.voucher.voucherId_required'),
  })
  voucherId: number;

  @IsOptional()
  name_vi?: string;

  @IsOptional()
  name_en?: string;

  @IsOptional()
  code?: string;

  @IsOptional()
  @Min(0, { message: i18nValidationMessage('validation.voucher.discount_min') })
  @Max(100, {
    message: i18nValidationMessage('validation.voucher.discount_max'),
  })
  discount?: number;

  @IsOptional()
  @Min(0, { message: i18nValidationMessage('validation.voucher.minPrice_min') })
  minPrice?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: i18nValidationMessage('validation.voucher.startAt_invalid'),
  })
  startAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: i18nValidationMessage('validation.voucher.endAt_invalid'),
  })
  endAt?: Date;

  @IsOptional()
  @Min(0, { message: i18nValidationMessage('validation.voucher.count_min') })
  count?: number;
}
