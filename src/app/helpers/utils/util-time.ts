import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class UtilTime {
  formatCurrency(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
