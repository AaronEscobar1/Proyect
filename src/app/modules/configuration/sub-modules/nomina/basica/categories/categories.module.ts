import { NgModule } from '@angular/core';

// Modules
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { CategoriesComponent } from './pages/categories/categories.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    DataTableComponent,
    ModalPrintComponent,
    ModalAddEditComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
