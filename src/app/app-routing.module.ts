import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'auth',
    // LazyLoad
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'main',
    // LazyLoad
    loadChildren: () => import('./modules/main-module.module').then( m => m.MainModuleModule)
  },
  { 
    path: '', redirectTo: 'auth', pathMatch: 'full' 
  },
  { 
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
