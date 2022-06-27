import { LoginComponent } from './module/login/login.component';
import { UserAuthGuard } from './core/guard/user-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './module/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'mainview',
    canActivate: [UserAuthGuard],
    loadChildren: () =>
      import('./module/main-view/main-view.module').then(
        (m) => m.MainViewModule
      ),
  },
  {
    path: '',
    redirectTo: 'mainview',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
