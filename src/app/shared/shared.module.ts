import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardMainComponent } from './components/card-main/card-main.component';
import { NavbarVerticalComponent } from './components/navbar-vertical/navbar-vertical.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CardMainComponent,
    NavbarVerticalComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,

    // Components
    NavbarComponent,
    CardMainComponent,
    NavbarVerticalComponent
  ],
})
export class SharedModule { }
