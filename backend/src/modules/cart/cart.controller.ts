import { Controller, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('/cart')
export class CartController {
    constructor(private readonly cartService: CartService){}

    @Post()
    createCart(@Req() request : any){
        return this.cartService.createCart(request)
    }
}
