import { Component } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms()
    .subscribe(rooms => this.rooms = rooms)
  }

  firstCharUpper(s?: string): string{
    if (!s) return ''; 
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}
