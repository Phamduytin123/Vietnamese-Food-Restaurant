import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { OrderStatusEnum } from "../../../common";

export class UpdateStatusDto {
    @IsNotEmpty({ message: i18nValidationMessage('validation.orderIdRequired') })
    id: number;
    @IsOptional()
    @IsEnum(OrderStatusEnum, { message: i18nValidationMessage('validation.orderStatusInvalid') })
    status: OrderStatusEnum
}