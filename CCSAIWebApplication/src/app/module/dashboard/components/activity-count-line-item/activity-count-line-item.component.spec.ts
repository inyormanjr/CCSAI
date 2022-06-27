import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCountLineItemComponent } from './activity-count-line-item.component';

describe('ActivityCountLineItemComponent', () => {
  let component: ActivityCountLineItemComponent;
  let fixture: ComponentFixture<ActivityCountLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCountLineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCountLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
