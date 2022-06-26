import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscussionModalComponent } from './update-discussion-modal.component';

describe('UpdateDiscussionModalComponent', () => {
  let component: UpdateDiscussionModalComponent;
  let fixture: ComponentFixture<UpdateDiscussionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiscussionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscussionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
