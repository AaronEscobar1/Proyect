import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailComponent } from './mail.component';
import { MailHomeComponent } from './sub-modules/mail-home/mail-home.component';

const routes: Routes = [
  {
    path: '', component: MailComponent,
    children: [
      {
        path: '', component: MailHomeComponent
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
export class MailRoutingModule { }
