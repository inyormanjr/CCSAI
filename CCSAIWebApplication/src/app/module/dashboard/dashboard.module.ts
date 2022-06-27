import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProgressLineItemComponent } from './components/progress-line-item/progress-line-item.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard.component';
import { ActivityCountLineItemComponent } from './components/activity-count-line-item/activity-count-line-item.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressLineItemComponent,
    DashboardCardComponent,
    StudentDashboardComponent,
    InstructorDashboardComponent,
    ActivityCountLineItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
