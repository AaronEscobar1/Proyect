import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalentComponent } from './talent.component';
import { TalentHomeComponent } from './sub-modules/talent-home/talent-home.component';

const routes: Routes = [
  {
    path: '', component: TalentComponent,
    children: [
      {
        path: '', component: TalentHomeComponent
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
export class TalentRoutingModule { }
