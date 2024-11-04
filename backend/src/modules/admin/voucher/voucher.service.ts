import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../../../entities';
import { Like, Repository } from 'typeorm';
import { clean, OrTypeOrm } from '../../../common';
import { UpdateVoucherDto } from './dtos/updateVoucher.request';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AdminVoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    private readonly i18n: I18nService
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

  async updateVoucher(body: UpdateVoucherDto, lang: string) {
    const {
      voucherId,
      name_vi,
      name_en,
      code,
      discount,
      minPrice,
      startAt,
      endAt,
      count,
    } = body;
    // Find the existing voucher by code
    const existingVoucher = await this.voucherRepository.findOne({
      where: { id: voucherId },
    });

    if (!existingVoucher) {
      throw new NotFoundException(
        this.i18n.t('error.voucher.voucherNotFound', {
          args: { voucherId: voucherId },
        })
      );
    }

    // Update the voucher properties
    const filterVoucher = clean({
      name_vi: name_vi,
      name_en: name_en,
      discount: discount,
      minPirce: minPrice,
      startAt: startAt,
      endAt: endAt,
      count: count,
      code: code,
    });

    const newVoucher = {
      ...existingVoucher,
      ...filterVoucher,
    }

    if (newVoucher.startAt && newVoucher.endAt && newVoucher.startAt >= newVoucher.endAt) {
      throw new BadRequestException(
        this.i18n.t('error.voucher.startAtMustBeLessThanEndAt', {
          args: { voucherId: voucherId },
        })
      );
    }

    // Save the updated voucher
    const updatedVoucher = await this.voucherRepository.save(newVoucher);

    // Return the updated voucher
    const { name_vi: _, name_en: __, ...restVoucher } = updatedVoucher;
    return {
      ...restVoucher,
      name: updatedVoucher[`name_${lang}`],
    };
  }
}
