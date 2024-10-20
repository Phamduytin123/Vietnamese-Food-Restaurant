import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ReviewRequest {
    @IsNotEmpty({ message: i18nValidationMessage('validation.commentRequired') })
    comment: string;

    @IsNotEmpty({ message: i18nValidationMessage('validation.ratingRequired') })
    @IsInt({ message: i18nValidationMessage('validation.ratingMustBeInteger') })
    @Min(0, { message: i18nValidationMessage('validation.ratingMin') })
    @Max(5, { message: i18nValidationMessage('validation.ratingMax') })
    rating: number;

    @IsNotEmpty({ message: i18nValidationMessage('validation.itemIdRequired') })
    itemId: number;
}
