import { Component } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent {

  room: Room | undefined;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private bookingService: BookingService,
    private location: Location,
    private router: Router) {}

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.roomService.getRoom(id)
    .subscribe(room => this.room = room);
  }

  updateRoom(): void {
    if (this.room) {
      this.roomService.updateRoom(this.room)
        .subscribe(() => this.location.back());
    }
  }

  updateBooking(booking: Booking): void {
    if (booking) {
      this.bookingService.updateBooking(booking)
        .subscribe(() => this.location.back());
    }
  }

  deleteRoom(id: number): void {
    if (id){
      this.roomService.deleteRoom(id)
        .subscribe(_ => this.router.navigateByUrl('/dashboard'));
    }
  }

  deleteBooking(bookingId: number): void {
    if (this.room) {
      this.bookingService.deleteBooking(bookingId)
      .subscribe(res => window.location.reload());    }
  }

  goBack(): void {
    this.location.back();
  }

}
