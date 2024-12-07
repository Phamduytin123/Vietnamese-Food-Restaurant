import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { AccountGenderEnum, AccountRoleEnum } from '../../../../common';

export class UpdateAccount {
  @IsNotEmpty({
    message: i18nValidationMessage('validation.account.account_required'),
  })
  accountId: number;

  @IsOptional()
  name: string;

  @IsOptional()
  displayName: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @IsEmail({}, { message: i18nValidationMessage('validation.emailInvalid') })
  email: string;

  @IsOptional()
  @IsPhoneNumber('VN', {
    message: i18nValidationMessage('validation.phoneInvalid'),
  })
  tel: string;

  @IsOptional()
  @IsEnum(AccountGenderEnum, {
    message: i18nValidationMessage('validation.account.gender_invalid'),
  })
  gender: AccountGenderEnum;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  avatar: string;

  @IsOptional()
  @IsEnum(AccountRoleEnum, {
    message: i18nValidationMessage('validation.account.role_invalid'),
  })
  role: AccountRoleEnum;
}
