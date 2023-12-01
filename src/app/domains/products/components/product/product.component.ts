import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import {RouterLinkWithHref} from '@angular/router'

import {ReversePipe} from '@shared/pipes/reverse.pipe'
import {TimeAgoPipe} from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  //img = "https://picsum.photos/640/640?r=" + Math.random();
  //@Input() Se le envia informacion del padre al hijo
  //@Input({required: true}) img: string = '';
  //@Input({required: true}) price: number  = 0;
  //@Input({required: true}) title: string = '';
  @Input({required: true}) product!:Product;

  //@Output() se le envia informacion del hijo al padre
  @Output() addToCart = new EventEmitter();

  addCartHandler(){
    this.addToCart.emit(this.product);
  }
}
