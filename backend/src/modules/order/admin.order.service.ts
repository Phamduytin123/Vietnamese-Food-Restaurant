import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities';
import { Repository } from 'typeorm';
import { AdminOrdersRequest } from './dtos/adminOrderRequest';
import { ItemFilterUtils } from '../../common';

@Injectable()
export class AdminOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    async getListOrder(query: AdminOrdersRequest, lang: string) {
        const { date, status } = query;

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

        const listOrderFound = await queryBuilder.getMany();

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

        return listOrder;
    }
}
