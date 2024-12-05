import { IsEnum, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { OrderStatusEnum } from '../../../../common';

export class AdminOrdersRequest {
  @IsOptional()
  @IsEnum(OrderStatusEnum, {
    message: i18nValidationMessage('validation.orderStatusInvalid'),
  })
  status: OrderStatusEnum;

  @IsOptional()
  date: Date;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}
