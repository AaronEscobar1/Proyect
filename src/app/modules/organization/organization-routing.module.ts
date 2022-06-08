import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { OrganizationHomeComponent } from './sub-modules/organization-home/organization-home.component';

const routes: Routes = [
  {
    path: '', component: OrganizationComponent,
    children: [
      {
        path: '', component: OrganizationHomeComponent
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

export class OrganizationRoutingModule { }
