// src/app/features/search-bar/search-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // ✅ import FormControl
import { debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule], // ✅ add ReactiveFormsModule
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchControl = new FormControl<string>(''); // ✅ explicitly type as string
  results: any[] = [];
  loading = false;
  error = '';

  @Output() assetSelected = new EventEmitter<any>();

  constructor(private api: ApiService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string | null) => {
       // Only search if query has 3 or more characters
        if (!query || query.length < 3) {
          this.results = [];
          return of([]);
        }

        this.loading = true;
        this.error = '';
        return this.api.searchCrypto(query).pipe(
          catchError(err => {
            this.error = 'Something went wrong';
            return of([]);
          })
        );
      })
    ).subscribe((res: any) => {
      this.loading = false;
      this.results = res?.coins || [];
    });
  }

  selectAsset(asset: any) {
    this.assetSelected.emit(asset);
    this.results = [];
    this.searchControl.setValue('');
  }
}
