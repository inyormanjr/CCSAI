import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleListModalComponent } from './user-role-list-modal.component';

describe('UserRoleListModalComponent', () => {
  let component: UserRoleListModalComponent;
  let fixture: ComponentFixture<UserRoleListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
