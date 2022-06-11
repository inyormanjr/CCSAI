import { TermsService } from './../../../core/http/terms.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Term } from 'src/app/shared/models/Term';
import { TermActionTypes } from '../action/term.actions.types';
import { TermSelectorTypes } from '../selector/term.selectors.types';
@Component({
  selector: 'app-update-term',
  templateUrl: './update-term.component.html',
  styleUrls: ['./update-term.component.css']
})
export class UpdateTermComponent implements OnInit {


  @Input() termId : any;

  termForm = this.formBuilder.group({
    termName: ['', Validators.required]
  });

  constructor(public activeModal: NgbActiveModal,
    private termStore : Store<Term>,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.termStore.dispatch(TermActionTypes.getTermById({_id : this.termId}));
    this.termStore.select(TermSelectorTypes.selectTerm).subscribe(res=>{
      this.initializeValues(res);
    });
  }

  get fc() {
    return this.termForm.controls;
  }

  

  updateTerm(){
    var term = this.termForm.value as Term;
    if (this.termForm.status !== "INVALID") {
      this.termStore.dispatch(TermActionTypes.updateTerm({term , id : this.termId}));
      this.termStore.select(TermSelectorTypes.selectTerm).subscribe(res=>{
        this.initializeValues(res);
      });
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  initializeValues(term: any) {

    this.termForm.controls['termName'].setValue(term.termName);
   
  }

}
