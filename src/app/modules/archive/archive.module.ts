import { NgModule } from '@angular/core';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchiveRoutingModule } from './archive-routing.module';

// Components
import { ArchiveComponent } from './archive.component';
import { ArchiveHomeComponent } from './sub-modules/archive-home/archive-home.component';

@NgModule({
  declarations: [
    ArchiveComponent,
    ArchiveHomeComponent
  ],
  imports: [
    SharedModule,
    ArchiveRoutingModule
  ]
})
export class ArchiveModule { }
