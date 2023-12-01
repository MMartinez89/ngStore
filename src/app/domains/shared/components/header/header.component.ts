import { Component, Input, SimpleChange, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import {RouterLinkWithHref, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  //@Input({required: true}) cart: Product[] = []
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  hideSideMenu = signal(true);
  //total = signal(0);

  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }

  //ngOnChanges(changes: any)  {
  //  const cart =  changes['cart'];
  //  if(cart){
  //    this.total.set(this.calcTotal());
  //  }
  //}

  //calcTotal(){
  //  return this.cart.reduce((total, product)=> total + product.price, 0);
  //}
}
