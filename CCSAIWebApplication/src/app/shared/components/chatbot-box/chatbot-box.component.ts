import { Message } from './../../models/message';
import { BotSocketService } from './../../../core/services/socketservice/bot-socket.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-chatbot-box',
  templateUrl: './chatbot-box.component.html',
  styleUrls: ['./chatbot-box.component.css']
})
export class ChatbotBoxComponent implements OnInit {
  gotStarted: boolean;
  hidden: boolean;
  message: string;
  messages: Message[] = [];
  isFetching: boolean;
  constructor(private botSocketServce: BotSocketService) {
    this.message = '';
    this.gotStarted = false;
    this.hidden = true;
    this.isFetching = false;
    botSocketServce.receivedReply().subscribe(x => {
      if (x) {
        this.botIsLoading();
           var newMessage: Message = {
             SenderMessage: x.outputMessage,
             ReceiverMessage: '',
           };
        setTimeout(() => {
          this.messages.push(newMessage);
          this.isFetching = false;
        }, 3000);
       }

    })
  }

  botIsLoading() {
    setTimeout(() => {
         this.isFetching = true;
     }, 800);
  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (this.message) {
    var newMessage: Message = {
      SenderMessage: '',
      ReceiverMessage: this.message,
    };
    this.messages.push(newMessage);
      this.botSocketServce.sendMessage(this.message);
      this.message = '';
    }
  }

  getStarted() {
    this.gotStarted = true;
      this.botSocketServce.sendMessage('Get started');
      this.message = '';
    }


  showHideBotChat() {
    if (this.hidden == false) {
        this.hidden = true;
    }
    else {
      this.hidden = false;
    }
  }

}
