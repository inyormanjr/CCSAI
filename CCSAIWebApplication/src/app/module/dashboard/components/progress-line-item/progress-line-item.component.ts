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

  progressBarColor(progressValue: any) {
    if (progressValue <= 30)
    {
      return 'bg-danger';
    } else if (progressValue >= 30 && progressValue <= 50) {
      return 'bg-warning';
    }
    else if (progressValue >= 50 && progressValue <= 90)
    {
      return 'bg-primary';
    }
    else {
      return 'bg-success';
    }

  }


  ngOnInit(): void {}
}
