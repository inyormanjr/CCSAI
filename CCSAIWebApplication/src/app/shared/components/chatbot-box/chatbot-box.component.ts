import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-box',
  templateUrl: './chatbot-box.component.html',
  styleUrls: ['./chatbot-box.component.css']
})
export class ChatbotBoxComponent implements OnInit {
  hidden :boolean;
  constructor() {
    this.hidden = false;
  }

  ngOnInit(): void {
  }

  showHideBotChat() {
    console.log(this.hidden)
    if (this.hidden == false) {
        this.hidden = true;
    }
    else {
      this.hidden = false;
    }
  }

}
