import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpInterceptorModule } from './interceptors/http-interceptor.module';

// Modulos para lenguaje en español
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Components
import { AppComponent } from './app.component';

// Cambiar el locale de la app
import localeEsVe from '@angular/common/locales/es-VE';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsVe);

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

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
    ReactiveFormsModule,
    // Lenguaje por defecto para la aplicación
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
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
