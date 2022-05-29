
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { NewEnrollmentComponent } from './new-enrollment/new-enrollment.component';
import { EnrollmentEffects } from './effect/enrollment.effects';



@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentListComponent,
    NewEnrollmentComponent,
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    NgbModule,
    DataTablesModule,
    ReactiveFormsModule,
    // EffectsModule.forFeature([EnrollmentEffects])
  ]
})
export class EnrollmentModule { }
