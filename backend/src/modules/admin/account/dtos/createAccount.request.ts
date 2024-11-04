import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { AccountGenderEnum, AccountRoleEnum } from '../../../../common';

export class CreateAccount {
  @IsNotEmpty({ message: i18nValidationMessage('validation.account.name_required') })
  name: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.account.displayName_required') })
  displayName: string;

  @IsOptional()
  address: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.account.email_required') })
  @IsEmail({}, { message: i18nValidationMessage('validation.emailInvalid') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.account.tel_required') })
  @IsPhoneNumber('VN', {
    message: i18nValidationMessage('validation.phoneInvalid'),
  })
  tel: string;

  @IsOptional()
  @IsEnum(AccountGenderEnum, {
    message: i18nValidationMessage('validation.account.gender_invalid'),
  })
  gender: AccountGenderEnum = AccountGenderEnum.MALE;

  @IsOptional()
  isActive: string = "false";

  @IsOptional()
  @IsEnum(AccountRoleEnum, {
    message: i18nValidationMessage('validation.account.role_invalid'),
  })
  role: AccountRoleEnum = AccountRoleEnum.STAFF;

  @IsNotEmpty({ message: i18nValidationMessage('validation.account.password_required') })
  password: string;
}