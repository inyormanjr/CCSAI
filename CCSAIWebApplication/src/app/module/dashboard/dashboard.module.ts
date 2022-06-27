
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProgressLineItemComponent } from './components/progress-line-item/progress-line-item.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard.component';
import { ActivityCountLineItemComponent } from './components/activity-count-line-item/activity-count-line-item.component';
import { DashboardCoursesCardComponent } from './components/dashboard-courses-card/dashboard-courses-card.component';
import { DashboardCoursesContainerComponent } from './components/dashboard-courses-container/dashboard-courses-container.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressLineItemComponent,
    DashboardCardComponent,
    StudentDashboardComponent,
    InstructorDashboardComponent,
    ActivityCountLineItemComponent,
    DashboardCoursesCardComponent,
    DashboardCoursesContainerComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
