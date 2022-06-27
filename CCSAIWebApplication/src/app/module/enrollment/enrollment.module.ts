import { enrollmentFeatureKey, enrollmentReducer } from './reducer/enrollment.reducer';

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { UpdateEnrollmentComponent } from './update-enrollment/update-enrollment.component';
import { EnrollmentDetailListComponent } from './enrollment-detail-list/enrollment-detail-list.component';



@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentListComponent,
    NewEnrollmentComponent,
    UpdateEnrollmentComponent,
    EnrollmentDetailListComponent,
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
  ],
  providers : [
    DatePipe
  ]
})
export class EnrollmentModule { }
