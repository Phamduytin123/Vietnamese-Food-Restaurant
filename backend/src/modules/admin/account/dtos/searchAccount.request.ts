import { IsEnum, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { AccountRoleEnum } from '../../../../common';

export class SearchAccount {
    
    @IsOptional()
    page: number = 1;

    @IsOptional()
    limit: number = 10;

    @IsOptional()
    txtSearch: string = "";

    @IsOptional()
    @IsEnum(AccountRoleEnum, {
        message: i18nValidationMessage('validation.account.role_invalid'),
    })
    role: AccountRoleEnum = AccountRoleEnum.CUSTOMER;
    
}
