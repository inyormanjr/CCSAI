import { Term } from './../../../shared/models/Term';
import { UpdateTermComponent } from './../update-term/update-term.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTermComponent } from '../new-term/new-term.component';
import { TermsService } from 'src/app/core/http/terms/terms.service';


@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.css']
})
export class TermListComponent implements OnInit,OnDestroy {

  terms: Term[] | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentUser: any = {};
  constructor(private termsService: TermsService,
    private tokenStorage: TokenStorageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.tokenStorage.getDecodedUserToken() !== null) {
      this.currentUser = this.tokenStorage.getDecodedUserToken()
    } else {
      this.currentUser = {};
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      retrieve: true,
      columns:[
        { "width": "90%" },
        { "width": "10%" }
      ]
    };
    this.getTerms();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getTerms() {

    this.termsService.Get(0,0).subscribe(res => {
      this.terms = res.data;
      this.dtTrigger.next();
    });
  }

  newTerm(){

       const modalRef = this.modalService.open(NewTermComponent, { size: 'lg',centered:true });
       modalRef.result.then((result) => {
        if ( result === 'success' ) {
           this.getTerms();
        }
      }, (reason) => {
      });
  }

  updateTerm(termId : String){
    const modalRef = this.modalService.open(UpdateTermComponent, { size: 'lg',centered:true });
    modalRef.componentInstance.termId = termId;
    modalRef.result.then((result) => {
     if ( result === 'success' ) {
        this.getTerms();
     }
   }, (reason) => {
   });
  }

}
