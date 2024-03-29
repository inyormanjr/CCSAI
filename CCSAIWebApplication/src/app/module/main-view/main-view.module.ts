import { BotChatLoadingComponent } from './../../shared/components/bot-chat-loading/bot-chat-loading.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainViewRoutingModule } from './main-view-routing.module';
import { MainViewComponent } from './main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MainNavBarComponent } from 'src/app/shared/components/main-nav-bar/main-nav-bar.component';
import { ChatbotBoxComponent } from 'src/app/shared/components/chatbot-box/chatbot-box.component';
import { ChatIconMessageComponent } from 'src/app/shared/components/chat-icon-message/chat-icon-message.component';


@NgModule({
  declarations: [
    MainViewComponent,
    MainNavBarComponent,

    ChatbotBoxComponent,
    ChatIconMessageComponent,
    BotChatLoadingComponent
  ],
  imports: [
    CommonModule,
    MainViewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ]
})
export class MainViewModule { }
