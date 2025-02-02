import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../types/product';
import { ProductsResponse } from '../../types/products-response';

@Injectable({
  providedIn: 'root',
})
export class ProductRequestService {
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<ProductsResponse>('https://dummyjson.com/products');
  }
  getOneProduct(id: string) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }
}
