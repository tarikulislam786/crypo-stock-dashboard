import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-panel',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnChanges {
  @Input() assets: any[] = [];
  @Input() days: number = 30;

  public chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public chartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };

  ngOnChanges() {
    if (!this.assets.length) return;

    this.chartData = {
      labels: this.assets[0]?.prices?.map((p: any) => new Date(p[0]).toLocaleDateString()) || [],
      datasets: this.assets.map(asset => ({
        label: asset.name,
        data: asset.prices?.map((p: any) => p[1]) || [],
        fill: false,
        tension: 0.3
      }))
    };
  }
}
