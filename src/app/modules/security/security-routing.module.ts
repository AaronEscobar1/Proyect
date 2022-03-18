import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SecurityHomeComponent } from './sub-modules/security-home/security-home.component';

const routes: Routes = [
  {
    path: '', component: SecurityComponent,
    children: [
      {
        path: '', component: SecurityHomeComponent
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
export class SecurityRoutingModule { }
