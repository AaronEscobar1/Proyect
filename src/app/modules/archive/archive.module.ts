import { NgModule } from '@angular/core';


// Modules
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ArchiveHomeComponent } from './pages/archive-home/archive-home.component';

@NgModule({
  declarations: [
    ArchiveHomeComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ArchiveModule { }
