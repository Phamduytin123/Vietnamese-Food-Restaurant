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

    async getValidVoucher() {
        const validVoucherFound = await this.voucherRepository.find({
            where: { endAt: MoreThan(new Date()), count: MoreThan(0) },
        });

        return validVoucherFound;
    }
}
