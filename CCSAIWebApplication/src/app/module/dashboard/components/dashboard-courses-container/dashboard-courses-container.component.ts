import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-courses-container',
  templateUrl: './dashboard-courses-container.component.html',
  styleUrls: ['./dashboard-courses-container.component.css']
})
export class DashboardCoursesContainerComponent implements OnInit {

  testArray: any[] = [1,2,3,4,5,6,7,8,9,10];
  constructor() {


   }

  ngOnInit(): void {
  }

}
