import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotChatLoadingComponent } from './bot-chat-loading.component';

describe('BotChatLoadingComponent', () => {
  let component: BotChatLoadingComponent;
  let fixture: ComponentFixture<BotChatLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotChatLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotChatLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
