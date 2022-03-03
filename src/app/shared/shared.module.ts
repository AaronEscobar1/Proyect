import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
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
    ReactiveFormsModule,
    FontAwesomeModule
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
