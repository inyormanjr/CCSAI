import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscussionModalComponent } from './add-discussion-modal.component';

describe('AddDiscussionModalComponent', () => {
  let component: AddDiscussionModalComponent;
  let fixture: ComponentFixture<AddDiscussionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscussionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscussionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
