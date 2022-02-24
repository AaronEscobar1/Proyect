import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardMainComponent } from './components/card-main/card-main.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CardMainComponent
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
    CardMainComponent
  ],
})
export class SharedModule { }
