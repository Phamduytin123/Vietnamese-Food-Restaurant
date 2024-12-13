import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities';
import { AccountUpdateDto } from './dtos/accountUpdateDto';
import { I18nService } from 'nestjs-i18n';
import { clean, PasswordUtils } from '../../common';
import { log } from 'console';
import { PasswordUpdateDto } from './dtos/passwordUpdateDto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly i18n: I18nService
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepo.find();
  }

  async create(requestBody: any): Promise<Account> {
    const { email, password, name } = requestBody;

    const newAccount = {
      email: email,
      password: password,
      name: name,
    };

    const account = this.accountRepo.create(newAccount);
    return this.accountRepo.save(account);
  }

  findByEmail(email: string): Promise<Account | null> {
    return this.accountRepo.findOneBy({ email });
  }

  findById(id: number): Promise<Account | null> {
    return this.accountRepo.findOneBy({ id });
  }

  async updateAccount(
    currentAccount: Account,
    updateAccount: AccountUpdateDto,
    avatarLink: any
  ) {
    const accountFound = await this.findById(currentAccount.id);
    if (!accountFound) {
      throw new NotFoundException(
        this.i18n.t('error.account.accountNotFound', {
          args: { accountId: currentAccount.id },
        })
      );
    }
    const { name, displayName, tel, address, gender } = updateAccount;
    const filterAccount = clean({
      name,
      displayName,
      tel,
      address,
      gender,
      avatar: avatarLink,
    });
    const newAccount = {
      ...accountFound,
      ...filterAccount,
    };
    return await this.accountRepo.save(newAccount);
  }
  
  async updatePassword(
    currentAccount: Account,
    requestBody: PasswordUpdateDto,
    lang: string
  ) {
    if (
      !PasswordUtils.checkPassword(
        requestBody.currentPassword,
        currentAccount.password
      )
    )
      throw new BadRequestException(
        this.i18n.t('error.account.invalidPassword')
      );
    if (requestBody.newPassword !== requestBody.confirmPassword) {
      throw new BadRequestException(
        this.i18n.t('error.account.invalidConfirmPassword')
      );
    }
    let accountFound = await this.findById(currentAccount.id);
    accountFound.password = PasswordUtils.hashPassword(requestBody.newPassword);
    return await this.accountRepo.save(accountFound);
  }
}
