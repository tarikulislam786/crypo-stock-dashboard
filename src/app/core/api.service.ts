// src/app/core/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cryptoBase = 'https://api.coingecko.com/api/v3';
  private stockBase = 'https://www.alphavantage.co/query';
  private apiKey = 'YOUR_ALPHA_VANTAGE_KEY';

  constructor(private http: HttpClient) {}

  searchCrypto(query: string): Observable<any> {
    return this.http.get(`${this.cryptoBase}/search?query=${query}`);
  }

  getCryptoDetails(id: string): Observable<any> {
    return this.http.get(`${this.cryptoBase}/coins/${id}`);
  }

  getCryptoMarketChart(id: string, days: number = 30): Observable<any> {
    return this.http.get(`${this.cryptoBase}/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
  }

  searchStock(symbol: string): Observable<any> {
    return this.http.get(`${this.stockBase}?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${this.apiKey}`);
  }

  getStockDetails(symbol: string): Observable<any> {
    return this.http.get(`${this.stockBase}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`);
  }

  getStockTimeSeries(symbol: string, interval: string = 'Daily'): Observable<any> {
    return this.http.get(`${this.stockBase}?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&apikey=${this.apiKey}`);
  }
}
