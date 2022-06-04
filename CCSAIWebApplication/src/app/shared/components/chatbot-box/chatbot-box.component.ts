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
  message: string | undefined;
  messages: Message[] = [];
  constructor(private botSocketServce: BotSocketService) {
    this.gotStarted = false;
    this.hidden = false;
    botSocketServce.receivedReply().subscribe(x => {
      if (x) {
           var newMessage: Message = {
             SenderMessage: x.outputMessage,
             ReceiverMessage: '',
           };
        setTimeout(() => {
       this.messages.push(newMessage);
        }, 3000);
       }

    })
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
    this.message = 'Get started';
    this.gotStarted = true;
    this.sendMessage();
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
