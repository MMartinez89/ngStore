import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductService} from '@shared/services/product.service'
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() id?: number;
  product = signal<Product | null>(null);
  cover = signal('')
  private productService = inject(ProductService);

  ngOnInit(): void {

    if(this.id){
      this.productService.getOne(this.id).subscribe({
        next:(product) => {
          this.product.set(product);
          if(product.images.length >0){
            this.cover.set(product.images[0])
          }
        }
      })
    }
      
  }

  changeCover(newImage: string){
    this.cover.set(newImage);
  }

}
