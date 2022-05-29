import { TermsService } from './../../../core/http/terms.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyjsService } from 'src/app/core/services/alertifyjs.service';
import { FormBuilder, Validators } from '@angular/forms';
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
    private termsService: TermsService,
    private alertifyService: AlertifyjsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get fc() {
    return this.termForm.controls;
  }

  addNewTerm(){
    var term = this.termForm.value;
    if (this.termForm.status !== "INVALID") {
      this.termsService.createTerm(term).subscribe(
        res => {
          if (res.success) {
            this.alertifyService.success("Term added.");
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

}
