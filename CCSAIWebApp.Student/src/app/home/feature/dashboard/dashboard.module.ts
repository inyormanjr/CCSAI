import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { CardOverviewComponent } from './components/card-overview/card-overview.component';
import { CardStatisticsComponent } from './components/card-statistics/card-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { UpcomingClassCardComponent } from './components/upcoming-class-card/upcoming-class-card.component';


const route: Routes = [{ path: '', component: DashboardViewComponent }];
@NgModule({
  declarations: [
    DashboardViewComponent,
    CardOverviewComponent,
    CardStatisticsComponent,
    UpcomingClassCardComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(route), NgChartsModule],
})
export class DashboardModule {}
