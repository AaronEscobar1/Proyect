import { NgModule } from '@angular/core';


// Modules
import { SharedModule } from 'src/app/shared/shared.module';

// Components
import { ArchiveComponent } from './archive.component';

@NgModule({
  declarations: [
    ArchiveComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ArchiveModule { }
