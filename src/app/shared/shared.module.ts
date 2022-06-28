import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";

// Components
import { CardMainComponent } from './components/card-main/card-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { TableSkeletonComponent } from './components/table-skeleton/table-skeleton.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    ButtonsComponent,
    CardMainComponent,
    FooterComponent,
    MenuComponent,
    TableSkeletonComponent,
    SpinnerComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    CalendarModule
  ],
  exports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,

    // Components
    ButtonsComponent,
    CardMainComponent,
    FooterComponent,
    MenuComponent,
    TableSkeletonComponent,
    SpinnerComponent,
    TopbarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
