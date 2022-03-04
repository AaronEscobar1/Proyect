import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { CardMainComponent } from './components/card-main/card-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';


@NgModule({
  declarations: [
    CardMainComponent,
    FooterComponent,
    MenuComponent,
    NavbarComponent,
    TopbarComponent
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
    CardMainComponent,
    FooterComponent,
    MenuComponent,
    NavbarComponent,
    TopbarComponent
  ],
})
export class SharedModule { }
