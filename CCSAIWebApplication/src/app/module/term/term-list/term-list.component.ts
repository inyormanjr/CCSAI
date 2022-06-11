import { TermState } from './../reducer/term.reducer';
import { Term } from './../../../shared/models/Term';
import { UpdateTermComponent } from './../update-term/update-term.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTermComponent } from '../new-term/new-term.component';
import { TermsService } from 'src/app/core/http/terms/terms.service';
import { Store } from '@ngrx/store';
import { TermActionTypes } from '../action/term.actions.types';
import { TermSelectorTypes } from '../selector/term.selectors.types';


@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css']
})
export class TermListComponent implements OnInit, OnDestroy {

  limit: number = 10;
  terms: Term[] = [];
  terms$: Observable<Term[]> | undefined;
  temp: Term[] = []
  currentUser: any = {};
  constructor(
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal,
    private termStore: Store<TermState>) {
    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }

    this.termStore.dispatch(TermActionTypes.loadTerms());
    this.terms$ = this.termStore.select(TermSelectorTypes.selectTerms);
    this.terms$.subscribe(res => {
      console.log(res);
      this.terms = res;
      this.temp = res;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
  

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.termName.toLowerCase().indexOf(val) !== -1  || !val;
    });
    this.terms = temp;
  }


  newTerm() {

    const modalRef = this.modalService.open(NewTermComponent, { size: 'lg', centered: true });
    // modalRef.result.then((result) => {
    //   if (result === 'success') {

    //   }
    // }, (reason) => {
    // });
  }

  updateTerm(termId: String) {
    const modalRef = this.modalService.open(UpdateTermComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.termId = termId;
    // modalRef.result.then((result) => {
    //   if (result === 'success') {

    //   }
    // }, (reason) => {
    // });
  }

}
