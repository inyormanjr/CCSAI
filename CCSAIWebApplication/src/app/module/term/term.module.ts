import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermRoutingModule } from './term-routing.module';
import { TermComponent } from './term.component';
import { TermListComponent } from './term-list/term-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NewTermComponent } from './new-term/new-term.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateTermComponent } from './update-term/update-term.component';


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
    DataTablesModule,
    NgbModule
  ]
})
export class TermModule { }
