import { AppRoutingModule } from './app/app-routing.module';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


bootstrapApplication(AppComponent,{
  providers: [importProvidersFrom(
    BrowserModule,
     AppRoutingModule,),
     provideHttpClient(
      withInterceptorsFromDi()
  ), provideAnimations(),
  providePrimeNG({
    theme: {
        preset: Aura
    }
}), provideAnimationsAsync()
]})
  .catch((err) => console.error(err));
