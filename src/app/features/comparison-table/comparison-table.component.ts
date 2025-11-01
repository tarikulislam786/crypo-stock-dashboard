// src/app/features/comparison-table/comparison-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comparison-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss']
})
export class ComparisonTableComponent {
  @Input() assets: any[] = [];
  @Output() removeAsset = new EventEmitter<any>();

  remove(asset: any) {
    this.removeAsset.emit(asset);
  }
}
