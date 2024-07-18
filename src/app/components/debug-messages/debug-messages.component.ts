import { Component } from '@angular/core';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-debug-messages',
  templateUrl: './debug-messages.component.html',
  styleUrl: './debug-messages.component.css'
})

export class DebugMessagesComponent {
  constructor(public messageService: MessageService) {}
}
