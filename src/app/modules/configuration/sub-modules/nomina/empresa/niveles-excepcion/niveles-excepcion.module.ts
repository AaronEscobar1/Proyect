import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { NivelesExcepcionRoutingModule } from './niveles-excepcion-routing.module';
import { SharedEmpresaModule } from '../shared-empresa/shared-empresa.module';

// Components 
import { DataTableNivelExcepcionComponent } from './components/data-table-nivel-excepcion/data-table-nivel-excepcion.component';
import { ModalAddEditComponent } from './components/modal-add-edit/modal-add-edit.component';
import { ModalPrintComponent } from './components/modal-print/modal-print.component';
import { NivelesExcepcionComponent } from './pages/niveles-excepcion/niveles-excepcion.component';
import { NivelesExcepcionHomeComponent } from './pages/niveles-excepcion-home/niveles-excepcion-home.component';
import { TipoNominaComponent } from './pages/tipo-nomina/tipo-nomina.component';

@NgModule({
  declarations: [
    DataTableNivelExcepcionComponent,
    ModalAddEditComponent,
    ModalPrintComponent,
    NivelesExcepcionComponent,
    NivelesExcepcionHomeComponent,
    TipoNominaComponent
  ],
  imports: [
    SharedModule,
    NivelesExcepcionRoutingModule,
    SharedEmpresaModule
  ]
})
export class NivelesExcepcionModule { }
