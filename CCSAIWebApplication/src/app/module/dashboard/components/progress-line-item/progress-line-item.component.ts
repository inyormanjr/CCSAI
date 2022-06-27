import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-progress-line-item',
  templateUrl: './progress-line-item.component.html',
  styleUrls: ['./progress-line-item.component.css'],
})
export class ProgressLineItemComponent implements OnInit {
  @Input() trailing: string = '';
  @Input() progressValue = 0;
  @Input()
  callbackFunction: void | undefined;

  _progressValue = '';
  constructor() {
    this._progressValue = this.progressValue.toString() + '%';

  }


  ngOnInit(): void {}
}
