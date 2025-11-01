import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardComponent } from './app/features/dashboard/dashboard.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(DashboardComponent, {
  providers: [importProvidersFrom(HttpClientModule)]
}).catch(err => console.error(err));
