import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/core/guard/user-auth.guard';
import { ChangeUserPasswordComponent } from '../user/change-user-password/change-user-password.component';
import { MainViewComponent } from './main-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        canActivate: [UserAuthGuard],
        data: {
          role: ['admin']
        },
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'term',
        canActivate: [UserAuthGuard],
        data: {
          role: ['admin']
        },
        loadChildren: () => import('../term/term.module').then(m => m.TermModule)
      },
      {
        path: 'course',
        canActivate: [UserAuthGuard],
        data: {
          role: ['admin', 'instructor']
        },
        loadChildren: () => import('../course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'enrollment',
        canActivate: [UserAuthGuard],
        data: {
          role: ['admin']
        },
        loadChildren: () => import('../enrollment/enrollment.module').then(m => m.EnrollmentModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule { }
