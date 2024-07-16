import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Booking } from '../booking';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css'
})
export class AddBookingComponent {

  @Input({ required: true}) roomId!: number;

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  constructor(private bookingService: BookingService, private router: Router, private messageService:MessageService){}

  addBooking(): void {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    if (!startDate || !endDate) {
      console.error('Start date and end date are required.');
      return;
    }

    this.bookingService.addBooking(this.roomId, startDate, endDate)
    .pipe(
      tap(booking => {
      console.log('Booking added successfully.');
          this.router.navigateByUrl(`/details/${this.roomId}`);
    }),
  catchError(this.handleError<Booking>('addBooking')))
      .subscribe();
  }

  private log(message: string){
    this.messageService.add(`RoomService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
