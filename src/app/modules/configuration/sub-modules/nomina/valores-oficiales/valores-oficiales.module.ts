import { NgModule } from '@angular/core';

// Modles
import { SharedModule } from 'src/app/shared/shared.module';
import { ValoresOficialesRoutingModule } from './valores-oficiales-routing.module';

// Components
import { DataTableComponent } from './components/data-table/data-table.component';
import { ValoresOficialesComponent } from './pages/valores-oficiales/valores-oficiales.component';


@NgModule({
  declarations: [
    ValoresOficialesComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    ValoresOficialesRoutingModule
  ]
})
export class ValoresOficialesModule { }
