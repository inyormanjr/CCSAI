import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.css'],
})
export class CardOverviewComponent {
  @Input() value = 0;
  @Input() title = 'Undefined';
  @Input() bsIcon = 'bi-graph-down';
  @Input() textColorClass = 'text-primary';
}
