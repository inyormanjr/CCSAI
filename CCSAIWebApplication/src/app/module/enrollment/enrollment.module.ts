import { enrollmentFeatureKey, enrollmentReducer } from './reducer/enrollment.reducer';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewEnrollmentComponent } from './new-enrollment/new-enrollment.component';
import { EnrollmentEffects } from './effect/enrollment.effects';
import { StoreModule } from '@ngrx/store';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



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
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(enrollmentFeatureKey, enrollmentReducer),
    EffectsModule.forFeature([EnrollmentEffects])
  ]
})
export class EnrollmentModule { }
