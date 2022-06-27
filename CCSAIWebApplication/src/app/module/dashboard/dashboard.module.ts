import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProgressLineItemComponent } from './components/progress-line-item/progress-line-item.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressLineItemComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
