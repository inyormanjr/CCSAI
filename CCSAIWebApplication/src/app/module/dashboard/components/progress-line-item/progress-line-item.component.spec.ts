import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressLineItemComponent } from './progress-line-item.component';

describe('ProgressLineItemComponent', () => {
  let component: ProgressLineItemComponent;
  let fixture: ComponentFixture<ProgressLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressLineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
