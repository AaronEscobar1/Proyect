import { NgModule } from '@angular/core';

// Modules
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { CategoriesComponent } from './pages/categories/categories.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ButtonsComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
