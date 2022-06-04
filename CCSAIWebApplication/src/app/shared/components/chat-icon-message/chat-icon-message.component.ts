import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-icon-message',
  templateUrl: './chat-icon-message.component.html',
  styleUrls: ['./chat-icon-message.component.css']
})
export class ChatIconMessageComponent implements OnInit {
  @Input() iconUrl: string | undefined;
  @Input() message: string | undefined;
  @Input() isUser: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
