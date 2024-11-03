import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private BASE_API: string = '';

  private http = inject(HttpClient);

  productList() {
    return this.http.get('https://fakestoreapi.com/products');
  }
}
