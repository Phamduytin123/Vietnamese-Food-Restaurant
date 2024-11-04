import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../../entities';
import { Like, Repository } from 'typeorm';
import {
  AccountRoleEnum,
  clean,
  OrTypeOrm,
  PasswordUtils,
} from '../../../common';
import { SearchAccount } from './dtos/searchAccount.request';
import { UpdateAccount } from './dtos/updateAccount.request';
import { I18nService } from 'nestjs-i18n';
import type { CreateAccount } from './dtos/createAccount.request';

@Injectable()
export class AdminAccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly i18n: I18nService
  ) {}

  async getAccounts(query: SearchAccount) {
    const { page, limit, txtSearch, role } = query;

    let conditions: any = {
      role: role,
    };

    if (txtSearch) {
      const searchConditions = {
        name: Like(`%${txtSearch}%`),
        email: Like(`%${txtSearch}%`),
        displayName: Like(`%${txtSearch}%`),
      };

      conditions = OrTypeOrm(searchConditions, conditions);
    }

    // Calculate the number of records to skip based on the current page and limit
    const skip = (page - 1) * limit;
    const take = limit;

    // Execute the query with pagination
    const [data, total] = await this.accountRepo.findAndCount({
      where: conditions,
      skip,
      take,
    });

    return {
      data: data.map(account => {
        const { password, ...restAccount } = account;
        return restAccount;
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateAccount(body: UpdateAccount) {
    const {
      accountId,
      name,
      displayName,
      address,
      email,
      tel,
      gender,
      role,
      isActive,
    } = body;

    const accountFound = await this.accountRepo.findOne({
      where: { id: accountId },
    });

    if (!accountFound) {
      throw new NotFoundException(
        this.i18n.t('error.account.accountNotFound', {
          args: { accountId: accountId },
        })
      );
    }

    var newAccount = clean({
      name: name,
      displayName: displayName,
      address: address,
      email: email,
      tel: tel,
      gender: gender,
      role: role,
      isActive: isActive == 'true',
    });

    newAccount = {
      ...accountFound,
      ...newAccount,
    };

    newAccount = await this.accountRepo.save(newAccount);

    return newAccount;
  }

  async createAccount(body: CreateAccount, avatar: string) {
    const {
      email,
      password,
      name,
      displayName,
      address,
      tel,
      gender,
      isActive,
      role,
    } = body;
    const existingAccount =  await this.accountRepo.findOne({
      where: { email: email },
    });

    if (existingAccount) {
      throw new BadRequestException(
        this.i18n.t('error.account.emailAlreadyExists', {
          args: { email: email },
        })
      );
    }

    const newAccount = this.accountRepo.create({
      name: name,
      displayName: displayName,
      address: address,
      tel: tel,
      gender: gender,
      role: role,
      email: email,
      isActive: isActive === 'true',
      password: PasswordUtils.hashPassword(password),
      avatar: avatar,
    });

    // Save the new account
    const savedAccount = await this.accountRepo.save(newAccount);

    // Remove password from the returned account object
    const { password: _, ...accountWithoutPassword } = savedAccount;

    return accountWithoutPassword;
  }
}
