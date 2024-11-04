import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CusCancelRequest {
  @IsNotEmpty({ message: i18nValidationMessage('validation.orderIdRequired') })
  id: number;
  @IsNotEmpty({
    message: i18nValidationMessage('validation.reasonCancelRequired'),
  })
  reasonCancel: string;
}
