import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveHomeComponent } from './sub-modules/archive-home/archive-home.component';
import { ArchiveComponent } from './archive.component';

const routes: Routes = [
  {
    path: '', component: ArchiveComponent,
    children: [
      {
        path: '', component: ArchiveHomeComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArchiveRoutingModule { }
