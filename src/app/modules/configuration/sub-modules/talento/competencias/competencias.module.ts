import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { CompetenciasRoutingModule } from './competencias-routing.module';

// Components
import { ButtonsNivelComponent } from './components/components-niveles/buttons-nivel/buttons-nivel.component';
import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { CompetenciasHomeComponent } from './pages/competencias-home/competencias-home.component';
import { DataTableComponent } from './components/components-competencias/data-table/data-table.component';
import { DataTableNivelComponent } from './components/components-niveles/data-table-nivel/data-table-nivel.component';
import { ModalAddEditComponent } from './components/components-competencias/modal-add-edit/modal-add-edit.component';
import { ModalAddEditNivelComponent } from './components/components-niveles/modal-add-edit-nivel/modal-add-edit-nivel.component';
import { ModalPrintComponent } from './components/components-competencias/modal-print/modal-print.component';
import { NivelesComponent } from './pages/niveles/niveles.component';

@NgModule({
  declarations: [
    ButtonsNivelComponent,
    CompetenciasComponent,
    CompetenciasHomeComponent,
    DataTableComponent,
    DataTableNivelComponent,
    ModalAddEditComponent,
    ModalAddEditNivelComponent,
    ModalPrintComponent,
    NivelesComponent
  ],
  imports: [
    SharedModule,
    CompetenciasRoutingModule
  ]
})
export class CompetenciasModule { }
