import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewReferenceTabComponent } from './module-view-reference-tab.component';

describe('ModuleViewReferenceTabComponent', () => {
  let component: ModuleViewReferenceTabComponent;
  let fixture: ComponentFixture<ModuleViewReferenceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleViewReferenceTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleViewReferenceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
