import { OrderService } from './../order/order.service';
import { CurrentAccount } from './../../common/decorator/currentAccount.decorator';
import { Account } from './../../entities/account.entity';
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
import { Cart } from '../../entities';
import { I18nService } from 'nestjs-i18n';
import { ItemAvailabilityEnum, OrderPaymentMethodEnum } from '../../common';

@Injectable()
export class ZaloPaymentService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        private readonly i18n: I18nService,
        private readonly orderService: OrderService
    ) {}

    async createPayment(lang: string, body: OrderRequest, req: any) {
        const { carts } = body;

        const deployedLink = this.configService.get<string>(
            'DEPLOY_SERVICE_LINK'
        );

        const config = {
            app_id: this.configService.get<string>('ZALOPAY_APP_ID'),
            key1: this.configService.get<string>('ZALOPAY_KEY1'),
            key2: this.configService.get<string>('ZALOPAY_KEY2'),
            endpoint: this.configService.get<string>('ZALOPAY_ENDPOINT_CREATE'),
        };

        const embed_data = {
            redirecturl: this.configService.get<string>('ZALOPAY_REDIRC_URL'),
        };
        const items = [
            {
                ...body,
                paymentMethod: OrderPaymentMethodEnum.ZALOPAY,
                lang: lang,
            },
        ];

        const foundCarts = [];

        for (const cart of carts) {
            const foundCart = await this.cartRepository.findOne({
                where: { id: cart.id, accountId: req.user.id },
                relations: ['itemSize', 'itemSize.item'],
            });

            if (!foundCart) {
                return new NotFoundException(
                    this.i18n.t('error.cart.cartNotFound', {
                        args: { cartId: cart.id },
                    })
                );
            }

            if (
                foundCart.itemSize.item.availability !==
                ItemAvailabilityEnum.IN_STOCK
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

        const totalPrice = foundCarts.reduce((totalPrice, foundCart) => {
            return totalPrice + foundCart.itemSize.price * foundCart.quantity;
        }, 0);

        const transID = Math.floor(Math.random() * 1000000);

        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: req.user.id,
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: totalPrice * 1000,
            description: `Lazada - Payment for the order #${transID}`,
            bank_code: '',
            callback_url: `${deployedLink}/payment/zalo/callback`,
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
            // Tạo mac để kiểm tra tính hợp lệ
            const mac = CryptoJS.HmacSHA256(
                dataStr,
                this.configService.get<string>('ZALOPAY_KEY2')
            ).toString();
            console.log('Generated mac =', mac);

            // Kiểm tra tính hợp lệ của callback (từ ZaloPay server)
            if (reqMac !== mac) {
                // Callback không hợp lệ
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

                console.log(orderReq, lang, account);

                const newOrder = await this.orderService.createOrder(
                    lang,
                    account,
                    orderReq
                );

                console.log(newOrder);

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
            throw new HttpException(
                'Error querying payment',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
