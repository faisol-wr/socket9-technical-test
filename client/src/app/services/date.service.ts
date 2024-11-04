import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private BASE_API: string = 'http://localhost:8080';

  private http = inject(HttpClient);

  productList() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  calculateDay(year: number, month: number, date: number) {
    return this.http.post<{ day: string }>(
      `${this.BASE_API}/date/calculateDay`,
      {
        year,
        month,
        date,
      }
    );
  }
}
