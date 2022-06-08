import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpInterceptorModule } from './interceptors/http-interceptor.module';

// Components
import { AppComponent } from './app.component';

// Cambiar el locale de la app
import localeEsVe from '@angular/common/locales/es-VE';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsVe);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpInterceptorModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    { 
      // Para colocar los pipes en español
      provide: LOCALE_ID, useValue: 'es-VE' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
