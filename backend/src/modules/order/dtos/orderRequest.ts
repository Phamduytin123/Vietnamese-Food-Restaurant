import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsOptional,
    IsEnum,
} from 'class-validator';
import { Cart } from '../../../entities';
import { OrderPaymentMethodEnum } from '../../../common';
import { i18nValidationMessage } from 'nestjs-i18n';

export class OrderRequest {
    @IsNotEmpty({ message: i18nValidationMessage('validation.cartsRequired') })
    carts: Cart[];

    @IsPhoneNumber('VN', {
        message: i18nValidationMessage('validation.phoneInvalid'),
    })
    phoneNumber: string;

    @IsNotEmpty({
        message: i18nValidationMessage('validation.receiverInvalid'),
    })
    receiver: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.addressInvalid') })
    address: string;

    @IsOptional()
    note?: string;

    @IsOptional()
    @IsEnum(OrderPaymentMethodEnum, {
        message: i18nValidationMessage('validation.paymentMethodInvalid'),
    })
    paymentMethod: OrderPaymentMethodEnum = OrderPaymentMethodEnum.CASH;

    @IsEmail({}, { message: i18nValidationMessage('validation.emailInvalid') })
    email: string;
}
