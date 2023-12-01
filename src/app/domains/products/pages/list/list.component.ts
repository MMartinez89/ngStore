import { Component, Inject, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from'../../components/product/product.component';
import{HeaderComponent} from '@shared/components/header/header.component';
import {RouterLinkWithHref} from '@angular/router'

import {Product}from '@shared/models/product.model'
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/categoory.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  //cart =  signal<Product[]>([]);
  private cartService = inject(CartService);
  private producService =  inject(ProductService);
  private categoriesService = inject(CategoryService)

  @Input() category_id?: string

  constructor() {
    /*const initProduct: Product[] = [
      {
        id: Date.now(),
        title: "Producto 1",
        price: 20,
        image: "https://picsum.photos/640/640?r=23",
        creationAt: new Date().toISOString()
      },
    ];
    this.products.set(initProduct);?*/
  }


  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: any) {
    this.getProducts();
  }
  
  addToCart(product: Product){
   // this.cart.update(prevState => [...prevState, product]);
   this.cartService.addToCart(product)
  }

  private getProducts(){
    this.producService.getProducts(this.category_id).subscribe({
      next: (products)=>{
        this.products.set(products);
      },
      error: (error) =>{
        console.log(error);
      }
    });    
  }

  private getCategories(){
    this.categoriesService.getAll().subscribe({
      next: (category)=>{
        this.categories.set(category)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
