import { AnouncementService } from './../../core/http/anouncement/anouncement.service';
import { EffectsModule } from '@ngrx/effects';
import { dashboardFeatureKey, dashboardReducer } from './reducer/dashboard.reducer';
import { StoreModule } from '@ngrx/store';

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
import { AnouncementItemComponent } from './components/anouncement-item/anouncement-item.component';
import { DashboardEffects } from './effect/dashboard.effects';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

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
    AnouncementItemComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature(dashboardFeatureKey, dashboardReducer),
    EffectsModule.forFeature([DashboardEffects])
  ],
  providers: [AnouncementService]

})
export class DashboardModule {}
