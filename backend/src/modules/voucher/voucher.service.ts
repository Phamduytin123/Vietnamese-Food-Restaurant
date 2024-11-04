import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../../entities';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>
  ) {}

  async getValidVoucher(lang: string) {
    const validVoucherFound = await this.voucherRepository.find({
      where: { endAt: MoreThan(new Date()), count: MoreThan(0) },
    });

    const validVouchers = validVoucherFound.map(validVoucher => {
      const { name_en, name_vi, ...voucherFilter } = validVoucher;
      return {
        ...voucherFilter,
        name: validVoucher[`name_${lang}`],
      };
    });

    return validVouchers;
  }
}
