import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  { 
    path: 'auth',
    // LazyLoad
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'main',
    // LazyLoad
    loadChildren: () => import('./modules/main-module.module').then( m => m.MainModuleModule),
    // Protección de rutas
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  { path: 'error', component: ErrorComponent },
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
