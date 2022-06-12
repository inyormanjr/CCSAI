import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsListModalComponent } from './terms-list-modal.component';

describe('TermsListModalComponent', () => {
  let component: TermsListModalComponent;
  let fixture: ComponentFixture<TermsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
