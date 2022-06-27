import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-courses-card',
  templateUrl: './dashboard-courses-card.component.html',
  styleUrls: ['./dashboard-courses-card.component.css']
})
export class DashboardCoursesCardComponent implements OnInit {
  isFlip = false;
  constructor() { }

  ngOnInit(): void {
  }

  flipDiv() {
    this.isFlip = true;
    }

}
