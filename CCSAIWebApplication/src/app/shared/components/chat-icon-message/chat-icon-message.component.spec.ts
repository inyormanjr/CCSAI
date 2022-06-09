import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIconMessageComponent } from './chat-icon-message.component';

describe('ChatIconMessageComponent', () => {
  let component: ChatIconMessageComponent;
  let fixture: ComponentFixture<ChatIconMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatIconMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatIconMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
