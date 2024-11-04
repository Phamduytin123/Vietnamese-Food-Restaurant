import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../../../entities';
import { Like, Repository } from 'typeorm';
import { OrTypeOrm } from '../../../common';

@Injectable()
export class AdminVoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>
  ) {}

  async getVoucher(query: any, lang: string) {
    const { txtSearch } = query;

    let conditions: any = {};

    if (txtSearch) {
      const searchConditions = {
        [`name_${lang}`]: Like(`%${txtSearch}%`),
        code: Like(`%${txtSearch}%`),
      };

      conditions = OrTypeOrm(searchConditions, conditions);
    }

    const vouchers = await this.voucherRepository.find({
      where: conditions,
    });

    return vouchers.map(voucher => {
      const { name_vi, name_en, ...restVoucher } = voucher;
      return {
        ...restVoucher,
        name: voucher[`name_${lang}`],
      };
    });
  }
}
