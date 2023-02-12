import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingClassCardComponent } from './upcoming-class-card.component';

describe('UpcomingClassCardComponent', () => {
  let component: UpcomingClassCardComponent;
  let fixture: ComponentFixture<UpcomingClassCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingClassCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingClassCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
