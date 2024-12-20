import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../entities';
import { Repository } from 'typeorm';
import { AdminOrdersRequest } from './dtos/adminOrderRequest';
import { ItemFilterUtils } from '../../../common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AdminOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly i18n: I18nService
  ) {}

  async getListOrder(query: AdminOrdersRequest, lang: string) {
    const { date, status, page = 1, limit = 10 } = query;

    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    if (date) {
      // So sánh chỉ phần ngày của createdAt với ngày từ query
      queryBuilder.andWhere('DATE(order.createdAt) = :date', { date });
    }

    // Thêm các quan hệ cần thiết
    queryBuilder
      .leftJoinAndSelect('order.account', 'account')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.itemSize', 'itemSize')
      .leftJoinAndSelect('itemSize.item', 'item');

    queryBuilder.orderBy('order.createdAt', 'DESC').addOrderBy('order.updatedAt', 'DESC');

    // Thực hiện phân trang
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [listOrderFound, total] = await queryBuilder.getManyAndCount();

    const listOrder = listOrderFound.map(order => ({
      ...order,
      orderDetails: order.orderDetails.map(orderDetail => {
        const { size_vi, size_en, ...itemSizeFilter } = orderDetail.itemSize;

        return {
          ...orderDetail,
          itemSize: {
            ...itemSizeFilter,
            size: orderDetail.itemSize[`size_${lang}`], // Lấy kích thước theo ngôn ngữ
            item: ItemFilterUtils.filterResponseData(
              orderDetail.itemSize.item,
              lang
            ),
          },
        };
      }),
    }));

    return {
      data: listOrder,
      total,
      page,
      limit,
    };
  }

  async getOrderDetail(id: number, lang: string) {
    const orderFound = await this.orderRepository.findOne({
      where: { id: id },
      relations: [
        'orderDetails',
        'voucher',
        'orderDetails.itemSize',
        'orderDetails.itemSize.item',
      ],
    });

    if (!orderFound) {
      return new NotFoundException(
        this.i18n.t('error.order.orderNotFound', {
          args: { orderId: id },
        })
      );
    }

    const { name_vi, name_en, ...voucherFilter } = orderFound.voucher;

    const order = {
      ...orderFound,
      orderDetails: orderFound.orderDetails.map(orderDetailFound => {
        const { size_en, size_vi, ...itemSizeFilter } =
          orderDetailFound.itemSize;

        return {
          ...orderDetailFound,
          itemSize: {
            ...itemSizeFilter,
            size: orderDetailFound.itemSize[`size_${lang}`],
            item: ItemFilterUtils.filterResponseData(
              orderDetailFound.itemSize.item,
              lang
            ),
          },
        };
      }),
      voucher: {
        ...voucherFilter,
        name: orderFound.voucher[`name_${lang}`],
      },
    };

    return order;
  }
}
