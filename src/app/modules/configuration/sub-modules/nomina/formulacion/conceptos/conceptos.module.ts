import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ConceptosRoutingModule } from './conceptos-routing.module';

// Components
import { ConceptosHomeComponent } from './pages/conceptos-home/conceptos-home.component';

@NgModule({
  declarations: [
    ConceptosHomeComponent
  ],
  imports: [
    SharedModule,
    ConceptosRoutingModule
  ]
})
export class ConceptosModule { }
