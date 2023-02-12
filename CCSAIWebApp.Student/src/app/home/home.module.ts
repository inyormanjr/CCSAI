import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { NavComponent } from './shared/nav/nav.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';



const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../home/feature/dashboard/dashboard.module').then(
            (x) => x.DashboardModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  declarations: [HomeViewComponent, NavComponent, SideNavComponent],
  imports: [CommonModule, RouterModule.forChild(routes),
    ],
  exports: []
})
export class HomeModule {}
