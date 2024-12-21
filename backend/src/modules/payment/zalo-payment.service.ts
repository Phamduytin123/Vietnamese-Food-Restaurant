import { OrderService } from '../order/order.service';
import { CurrentAccount } from '../../common/decorator/currentAccount.decorator';
import { Account } from '../../entities/account.entity';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import * as qs from 'qs';
import { OrderRequest } from '../order/dtos/orderRequest';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, ItemSize } from '../../entities';
import { I18nService } from 'nestjs-i18n';
import { ItemAvailabilityEnum, OrderPaymentMethodEnum } from '../../common';
import { ro } from '@faker-js/faker/.';

@Injectable()
export class ZaloPaymentService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(ItemSize)
    private readonly itemSizeRepository: Repository<ItemSize>,
    private readonly i18n: I18nService,
    private readonly orderService: OrderService
  ) {}

  async createPayment(lang: string, body: OrderRequest, account: Account) {
    const { carts, totalPrice, rootRedirectUrl } = body;

    const deployedLink = this.configService.get<string>('DEPLOY_SERVICE_LINK');

    const config = {
      app_id: this.configService.get<string>('ZALOPAY_APP_ID'),
      key1: this.configService.get<string>('ZALOPAY_KEY1'),
      key2: this.configService.get<string>('ZALOPAY_KEY2'),
      endpoint: this.configService.get<string>('ZALOPAY_ENDPOINT_CREATE'),
    };

    const embed_data = {
      redirecturl: rootRedirectUrl,
    };

    const transID = Math.floor(Math.random() * 1000000);

    const appTransId = `${moment().format('YYMMDD')}_${transID}`;

    const items = [
      {
        ...body,
        paymentMethod: OrderPaymentMethodEnum.ZALOPAY,
        isPaid: true,
        paymentCode: appTransId,
        lang: lang,
      },
    ];

    const foundCarts = [];

    for (const cart of carts) {
      var foundCart = new Cart();

      if (cart.id) {
        foundCart = await this.cartRepository.findOne({
          where: { id: cart.id, accountId: account.id },
          relations: ['itemSize', 'itemSize.item'],
        });

        if (!foundCart) {
          return new NotFoundException(
            this.i18n.t('error.cart.cartNotFound', {
              args: { cartId: cart.id },
            })
          );
        }
      } else {
        foundCart = cart;
        const itemSize = await this.itemSizeRepository.findOne({
          where: { id: cart.itemSizeId },
          relations: ['item'],
        });

        if (!itemSize) {
          return new NotFoundException(
            this.i18n.t('error.item.itemSizeNotFound', {
              args: { itemId: cart.itemSizeId },
            })
          );
        }

        foundCart.itemSize = itemSize;
      }

      if (
        foundCart.itemSize.item.availability !== ItemAvailabilityEnum.IN_STOCK
      ) {
        return new ForbiddenException(
          this.i18n.t('error.cart.itemStatusIsNotInStock', {
            args: {
              itemId: foundCart.itemSize.item.id,
              itemStatus: foundCart.itemSize.item.availability,
            },
          })
        );
      }

      foundCarts.push(foundCart);
    }

    const order = {
      app_id: config.app_id,
      app_trans_id: appTransId,
      app_user: account.id,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: totalPrice,
      description: `Product - Payment for the order #${transID}`,
      bank_code: '',
      callback_url: `${deployedLink}/zalo-payment/callback`,
    };

    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order['mac'] = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
      const response = await axios.post(config.endpoint, null, {
        params: order,
      });
      return { ...response.data, app_trans_id: order.app_trans_id };
    } catch (error: any) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  async handleZaloCallback(body: any) {
    const { data: dataStr, mac: reqMac } = body;

    console.log('callback');
    let result: any = {};

    try {
      const mac = CryptoJS.HmacSHA256(
        dataStr,
        this.configService.get<string>('ZALOPAY_KEY2')
      ).toString();
      console.log('Generated mac =', mac);

      if (reqMac !== mac) {
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        // Thanh toán thành công
        const dataJson = JSON.parse(dataStr);
        console.log(
          "Update order's status = success where app_trans_id =",
          dataJson['app_trans_id']
        );

        const item = JSON.parse(dataJson.item);

        const orderReq: OrderRequest = item[0];
        const { lang } = item[0];
        const account = new Account();
        account.id = dataJson.app_user;

        const newOrder = await this.orderService.createOrder(
          lang,
          account,
          orderReq
        );

        console.log('new Order : ', newOrder);

        result.return_code = 1;
        result.return_message = 'success';
      }
    } catch (ex: any) {
      // Trường hợp lỗi, ZaloPay sẽ gọi lại (tối đa 3 lần)
      result.return_code = 0;
      result.return_message = ex.message;
    }

    return result;
  }

  async queryPayment(app_trans_id: string) {
    const postData = {
      app_id: this.configService.get<string>('ZALOPAY_APP_ID'),
      app_trans_id: app_trans_id,
      mac: '',
    };

    // Tạo dữ liệu cho HMAC
    const data = `${postData.app_id}|${postData.app_trans_id}|${this.configService.get<string>('ZALOPAY_KEY1')}`;

    // Tính toán MAC HMAC SHA256
    postData.mac = CryptoJS.HmacSHA256(
      data,
      this.configService.get<string>('ZALOPAY_KEY1')
    ).toString();

    try {
      const response = await axios.post(
        this.configService.get<string>('ZALOPAY_ENDPOINT_QUERY'),
        qs.stringify(postData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException('Error querying payment', HttpStatus.BAD_REQUEST);
    }
  }
}
