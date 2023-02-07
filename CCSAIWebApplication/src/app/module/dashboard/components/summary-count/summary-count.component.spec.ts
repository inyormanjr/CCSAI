import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCountComponent } from './summary-count.component';

describe('SummaryCountComponent', () => {
  let component: SummaryCountComponent;
  let fixture: ComponentFixture<SummaryCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
