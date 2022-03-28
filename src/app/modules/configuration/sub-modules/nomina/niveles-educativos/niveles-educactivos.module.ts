import { NgModule } from '@angular/core';

// Modules
import { NivelesEducactivosRoutingModule } from './niveles-educactivos-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';

// Components
import { NivelesEducativosComponent } from './pages/niveles-educativos/niveles-educativos.component';

@NgModule({
  declarations: [
    NivelesEducativosComponent,
  ],
  imports: [
    SharedModule,
    NivelesEducactivosRoutingModule
  ]
})
export class NivelesEducactivosModule { }
