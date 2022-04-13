import { NgModule } from '@angular/core';

// Modles
import { SharedModule } from 'src/app/shared/shared.module';
import { ValoresOficialesRoutingModule } from './valores-oficiales-routing.module';

// Components
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ValoresOficialesComponent } from './pages/valores-oficiales/valores-oficiales.component';


@NgModule({
  declarations: [
    ValoresOficialesComponent,
    ButtonsComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    ValoresOficialesRoutingModule
  ]
})
export class ValoresOficialesModule { }
