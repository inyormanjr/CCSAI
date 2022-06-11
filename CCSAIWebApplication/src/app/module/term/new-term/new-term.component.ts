import { TermState } from './../reducer/term.reducer';
import { TermsService } from './../../../core/http/terms.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TermActionTypes } from '../action/term.actions.types';
import { Term } from 'src/app/shared/models/Term';
import { TermSelectorTypes } from '../selector/term.selectors.types';
@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.component.html',
  styleUrls: ['./new-term.component.css']
})
export class NewTermComponent implements OnInit {


  termForm = this.formBuilder.group({
    termName: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder,
    private termStore: Store<TermState>) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.termForm.controls;
  }

  addNewTerm() {
    var term = this.termForm.value as Term;
    if (this.termForm.status !== "INVALID") {
      this.termStore.dispatch(TermActionTypes.createTerm({ data: term }));
      this.termStore.select(TermSelectorTypes.selectTerm).subscribe(res => {
        if (res._id.length > 0) {
          this.termForm.reset();
        }
      });
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

}
