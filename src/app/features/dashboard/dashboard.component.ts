// src/app/features/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// ✅ Correct relative imports
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ComparisonTableComponent } from '../comparison-table/comparison-table.component';
import { ChartPanelComponent } from '../chart-panel/chart-panel.component';
import { ApiService } from '../../core/api.service'; // ✅ correct path
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBarComponent,      // <-- Add this
    ComparisonTableComponent,
    ChartPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedAssets: any[] = [];
  timeRange: number = 30;

  constructor(private api: ApiService) {}

  async addAsset(asset: any) {
    if (this.selectedAssets.length >= 5) return;
    if (this.selectedAssets.find(a => a.id === asset.id)) return;

    try {
      const details: any = await this.api.getCryptoMarketChart(asset.id, this.timeRange).toPromise();
      const assetWithChart = {
        ...asset,
        prices: details.prices,
        market_cap: details.market_caps?.[0]?.[1] || 0,
        current_price: details.prices?.[details.prices.length - 1]?.[1] || 0
      };
      this.selectedAssets.push(assetWithChart);
    } catch (err) {
      console.error('Error fetching asset details', err);
      alert('Failed to load asset data');
    }
  }

  removeAsset(asset: any) {
    this.selectedAssets = this.selectedAssets.filter(a => a.id !== asset.id);
  }

  changeTimeRange(days: number) {
    this.timeRange = days;

    this.selectedAssets.forEach(async (asset, index) => {
      try {
        const details: any = await this.api.getCryptoMarketChart(asset.id, this.timeRange).toPromise();
        this.selectedAssets[index] = { ...asset, prices: details.prices };
      } catch (err) {
        console.error('Error updating chart', err);
      }
    });
  }
}
