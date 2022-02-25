import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModuleModule { }
