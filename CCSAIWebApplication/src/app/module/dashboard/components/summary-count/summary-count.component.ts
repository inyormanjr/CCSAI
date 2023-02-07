import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-count',
  templateUrl: './summary-count.component.html',
  styleUrls: ['./summary-count.component.css']
})
export class SummaryCountComponent implements OnInit {
  @Input() trailing: string='';
  @Input() countContent = 0;
  callbackFunction: void | undefined;

  _countContent = '';
  constructor() {
    this._countContent = this.countContent.toString()
  }


  ngOnInit(): void {
  }

}
