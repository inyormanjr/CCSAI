import { TermsService } from './../../../core/http/terms.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
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
    private termsService: TermsService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getTermById()
  }

  get fc() {
    return this.termForm.controls;
  }

  getTermById() {

    this.termsService.getTermById(this.termId).subscribe(res => {
      if (res.success) {
        this.initializeValues(res.data);
      }
    },
      error => {
        this.alertifyService.error(error.error.error);
      });
  }

  updateTerm(){
    var term = this.termForm.value;
    if (this.termForm.status !== "INVALID") {
      this.termsService.updateTerm(term,this.termId).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("Term updated");
            this.activeModal.close('success');
          }
        },
        error => {
          this.alertifyService.error(error.error.error);
        }
      );
    } else {
      this.alertifyService.error("Please fill up all required information.");
    }
  }

  initializeValues(term: any) {

    this.termForm.controls['termName'].setValue(term.termName);
   
  }

}
