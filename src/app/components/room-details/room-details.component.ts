import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { BookingService } from '../../service/booking.service';
import { Room } from '../../model/room';
@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {

  room: Room | undefined;

  constructor(
  private route: ActivatedRoute,
  private roomService: RoomService,
  private bookingService: BookingService,
  private location: Location,
private router: Router){}


  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roomService.getRoom(id)
    .subscribe(room => this.room = room);
  }

  goBack(): void {
    this.location.back();
  }


  updateRoom(name: string): void {
    let room: Room = {
      id: this.room!.id,
      name: name,
    }

    if (this.room){
      this.roomService.updateRoom(room)
        .subscribe(_ => window.location.reload());
    }
  }

  deleteBooking(bookingId: number): void { 
    this.bookingService.deleteBooking(bookingId)
        .subscribe(res => window.location.reload());
  }

  firstCharUpper(s?: string): string{
    if (!s) return ''; 
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}
