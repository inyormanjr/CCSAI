import { TermEffects } from './effect/term.effects';
import { termFeatureKey, termReducer } from './reducer/term.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermRoutingModule } from './term-routing.module';
import { TermComponent } from './term.component';
import { TermListComponent } from './term-list/term-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTermComponent } from './new-term/new-term.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTermComponent } from './update-term/update-term.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    TermComponent,
    TermListComponent,
    NewTermComponent,
    UpdateTermComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TermRoutingModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    StoreModule.forFeature(termFeatureKey,termReducer),
    EffectsModule.forFeature([TermEffects])
  ]
})
export class TermModule { }
