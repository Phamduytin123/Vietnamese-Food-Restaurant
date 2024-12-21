import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Order, Review } from '../../entities';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import {
  AccountRoleEnum,
  ItemFilterUtils,
  OrderStatusEnum,
} from '../../common';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  getRevenueFromOrders(ordersFound: any) {
    const today = moment();
    const startOfWeek = today.clone().startOf('isoWeek');
    const endOfWeek = today.clone().endOf('isoWeek');

    const revenueData = {};

    for (
      let date = startOfWeek.clone();
      date.isBefore(endOfWeek) || date.isSame(endOfWeek);
      date.add(1, 'day')
    ) {
      const formattedDate = date.format('YYYY-MM-DD');
      revenueData[formattedDate] = {
        orderCount: 0,
        totalRevenue: 0,
        dayOfWeek: date.format('dddd'),
      };
    }

    ordersFound.forEach((order: any) => {
      const orderDate = moment(order.createdAt).format('YYYY-MM-DD');

      if (
        moment(order.createdAt).isBetween(startOfWeek, endOfWeek, 'day', '[]')
      ) {
        revenueData[orderDate].orderCount += 1;
        revenueData[orderDate].totalRevenue += order.totalPrice;
      }
    });

    const revenueArray = Object.keys(revenueData).map(date => ({
      date,
      orderCount: revenueData[date].orderCount,
      totalRevenue: revenueData[date].totalRevenue,
      dayOfWeek: revenueData[date].dayOfWeek,
    }));

    return revenueArray.sort((a, b) => moment(a.date).diff(moment(b.date)));
  }

  async countReviews() {
    return this.reviewRepository.count();
  }

  async getRevenue(lang: string, query: any) {
    const { page = 1, limit = 3 } = query;

    const skip = (page - 1) * limit;

    const accounts = await this.accountRepository.find();
    const ordersFound = await this.orderRepository.find({
      order: {
        updatedAt: 'DESC',
        createdAt: 'DESC',
      },
    });
    const reviewsFound = await this.reviewRepository.find({
      order: {
        updatedAt: 'DESC',
        createdAt: 'DESC',
      },
      relations: ['account', 'itemSize', 'itemSize.item'],
      skip: skip,
      take: limit,
    });
    const revenueFor7Days = this.getRevenueFromOrders(ordersFound);

    const userAccountCount = accounts.filter(
      account => account.role === AccountRoleEnum.CUSTOMER
    ).length;

    const totalRevenue = ordersFound.reduce(
      (value, orderFound) => orderFound.totalPrice + value,
      0
    );

    const totalPendingOrder = ordersFound.reduce(
      (value, orderFound) =>
        orderFound.status !== OrderStatusEnum.DONE ? ++value : value,
      0
    );

    const totalReviews = await this.countReviews();
    const totalPages = Math.ceil(totalReviews / limit);

    return {
      totalUser: userAccountCount,
      totalOrder: ordersFound.length,
      totalRevenue: totalRevenue,
      totalPendingOrder: totalPendingOrder,
      revenueFor7Days: revenueFor7Days,
      totalPages: totalPages,
      reviews: reviewsFound.map(reviewFound => ({
        ...reviewFound,
        item: ItemFilterUtils.filterResponseData(
          reviewFound.itemSize.item,
          lang
        ),
      })),
    };
  }
}
