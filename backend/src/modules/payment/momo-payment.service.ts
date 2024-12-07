import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRequest } from '../order/dtos/orderRequest';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, Cart } from '../../entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { OrderService } from '../order/order.service';
import axios from 'axios';
import {
  CurrentAccount,
  ItemAvailabilityEnum,
  OrderPaymentMethodEnum,
} from '../../common';
import { log } from 'console';

@Injectable()
export class MomoPaymentService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly i18n: I18nService,
    private readonly orderService: OrderService
  ) {}
  async createPayment(
    lang: string,
    body: OrderRequest,
    @CurrentAccount() currentAccount: Account
  ) {
    const { carts, totalPrice } = body;

    const foundCarts = [];

    for (const cart of carts) {
      const foundCart = await this.cartRepository.findOne({
        where: { id: cart.id, accountId: currentAccount.id },
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

    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    // console.log(foundCarts);

    const items = foundCarts.map(cart => {
      const itemName = cart.itemSize.item.name_en;
      const quantity = cart.quantity;
      const price = cart.itemSize.price * cart.quantity ; // Giả sử giá được nhân với 1000 để ra VND
      return {
        imageUrl: null, // Bạn có thể thêm link hình ảnh sản phẩm thực nếu cần
        name: itemName,
        quantity: quantity,
        price: price,
      };
    });

    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const orderInfo = 'pay with MoMo';
    const partnerCode = 'MOMO';
    const redirectUrl = process.env.MOMO_REDIRC_URL;
    const ipnUrl = process.env.DEPLOY_SERVICE_LINK + '/momo-payment/callback';
    // const ipnUrl = 'https://dc61-2402-800-629c-1fd3-6186-8883-cf12-7a5c.ngrok-free.app/momo-payment/callback';
    const requestType = 'payWithMethod';
    const amount = `${totalPrice}`;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const dataCallback = [
      {
        ...body,
        paymentMethod: OrderPaymentMethodEnum.MOMO,
        lang: lang,
        currentAccount: currentAccount,
        isPaid: true,
        paymentCode: orderId,
      },
    ];
    const extraData = Buffer.from(JSON.stringify(dataCallback)).toString(
      'base64'
    ); // Mã hóa base64

    // const orderGroupId = '';
    const autoCapture = true;

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      // items: [{ "image": "https://momo.vn/uploads/product1.jpg", "name": "Product 1", "quantity": 1, "amount": 20000 }, { "image": "https://momo.vn/uploads/product2.jpg", "name": "Product 2", "quantity": 2, "amount": 30000 }],
      items: items,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      // orderGroupId: orderGroupId,
      signature: signature,
    });
    console.log(requestBody);

    // options for axios
    const options = {
      method: 'POST',
      url: process.env.MOMO_ENDPOINT_CREATE,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    // Send the request and handle the response
    let result;
    try {
      result = await axios(options);
      return { ...result.data };
    } catch (error: any) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  async callback(req: any) {
    const response = req.body;
    console.log(req.body);

    console.log('--------------------PAYMENT CALLBACK----------------');
    console.log(response); // In ra phản hồi từ MoMo

    // Kiểm tra trạng thái thanh toán
    if (response && response.resultCode === 0) {
      // Thanh toán thành công
      console.log('Payment Successful:', response);
      // Bạn có thể lưu thông tin thanh toán vào cơ sở dữ liệu hoặc xử lý tiếp theo tại đây

      const extraData = response.extraData
        ? JSON.parse(Buffer.from(response.extraData, 'base64').toString())
        : null;
      console.log('Extra Data:', extraData);
      console.log(extraData[0].carts);

      const orderReq: OrderRequest = extraData[0];
      // console.log(orderReq);

      const lang = extraData[0].lang;
      const currentAccount = extraData[0].currentAccount;
      console.log(orderReq, lang, currentAccount);

      const newOrder = await this.orderService.createOrder(
        lang,
        currentAccount,
        orderReq
      );

      console.log(newOrder);
    } else {
      // Thanh toán thất bại hoặc có vấn đề
      console.log('Payment Failed:', response);
    }

    return response;
  }

  async checkStatusTrans(req: any) {
    const { orderId } = req.body;

    // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
    // &requestId=$requestId
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = JSON.stringify({
      partnerCode: 'MOMO',
      requestId: orderId,
      orderId: orderId,
      signature: signature,
      lang: 'vi',
    });
    const options = {
      method: 'POST',
      url: process.env.MOMO_ENDPOINT_QUERY,
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    };
    var result;
    try {
      result = await axios(options);
      return { ...result.data };
    } catch (error: any) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  }
}
