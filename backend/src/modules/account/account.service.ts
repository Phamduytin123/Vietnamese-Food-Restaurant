import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities';
import { AccountUpdateDto } from './dtos/accountUpdateDto';
import { I18nService } from 'nestjs-i18n';
import { PasswordUtils } from '../../common';
import { log } from 'console';

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
    lang: string,
    currentAccount: Account,
    updateAccount: AccountUpdateDto
  ) {
    const accountFound = await this.findById(currentAccount.id);
    if (!accountFound) {
      throw new NotFoundException(
        this.i18n.t('error.account.accountNotFound', {
          args: { accountId: currentAccount.id },
        })
      );
    }
    // Cập nhật thông tin tài khoản từ DTO
    accountFound.name = updateAccount.name ?? accountFound.name;
    accountFound.displayName =
      updateAccount.displayName ?? accountFound.displayName;
    accountFound.email = updateAccount.email ?? accountFound.email;
    accountFound.tel = updateAccount.tel ?? accountFound.tel;
    accountFound.address = updateAccount.address ?? accountFound.address;
    accountFound.gender = updateAccount.gender ?? accountFound.gender;
    accountFound.avatar = updateAccount.avatar ?? accountFound.avatar;
    if (
      !PasswordUtils.checkPassword(
        updateAccount.password,
        accountFound.password
      )
    ) {
      accountFound.password = PasswordUtils.hashPassword(
        updateAccount.password
      );
    }
    return await this.accountRepo.save(accountFound);
  }
}
