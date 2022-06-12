import { Term } from './../../../shared/models/Term';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { EnrollmentState } from '../../enrollment/reducer/enrollment.reducer';
import { Observable } from 'rxjs';
import { EnrollmentActionTypes } from '../../enrollment/action/enrollment.action.types';
import { EnrollmentSelectorTypes } from '../../enrollment/selector/enrollment.selector.types';

@Component({
  selector: 'app-terms-list-modal',
  templateUrl: './terms-list-modal.component.html',
  styleUrls: ['./terms-list-modal.component.css']
})
export class TermsListModalComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  limit: number = 10;
  terms: Term[] = [];
  terms$: Observable<Term[]> | undefined;
  temp: Term[] = []

  constructor(public activeModal: NgbActiveModal,
    private enrollmentStore: Store<EnrollmentState>) {
      this.enrollmentStore.dispatch(EnrollmentActionTypes.loadTerms());
      this.terms$ = this.enrollmentStore.select(EnrollmentSelectorTypes.selectTerms);
      this.terms$.subscribe(res => {
   
        this.terms = res;
        this.temp = res;
      });
     }

  ngOnInit(): void {
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.termName.toLowerCase().indexOf(val) !== -1  || !val;
    });
    this.terms = temp;
  }

  select(term : Term){
    
    const termCopy = {...term};
    termCopy.termName = termCopy.termName.toUpperCase();

      this.passEntry.emit(termCopy);
      this.activeModal.close('success');
  }

}
