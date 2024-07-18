import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { environment } from '../../environments/environment';
import { Booking } from '../model/booking';
import { Room } from '../model/room';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  //private hotelmanagerUrl = '/url/api/v1/bookings';
  private apiUrl = `${environment.apiUrl}/api/v1/bookings`;
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient, 
    private messageService: MessageService,
    private dialog: MatDialog) { }

    addBooking(roomId: number, startDate?: Date, endDate?: Date) {
      const body = { startDate, endDate };
  
      return this.http.post<any>(`${this.apiUrl}/${roomId}`, body)
        .pipe(
          tap((newBooking: any) => {
            console.log(`Added booking with id=${newBooking.id}`); 
            window.location.reload();}
          ),
          catchError(error => {
            this.openErrorDialog(error);
            return throwError(() => error);
          })
        );
    }
    
  updateBooking(booking: Booking): Observable<any> {
    return this.http.put(this.apiUrl, booking, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated booking id=${booking.id}`)),
        catchError(error => {
          this.openErrorDialog(error);
          return throwError(() => error);
        })
      );
  }

  deleteBooking(id: number): Observable<Room> {
    const url = `${this.apiUrl}/${id}`
    this.log(`del url: ${url}`)

    return this.http.delete<Room>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted room id=${id}`)),
      catchError(error => {
        this.openErrorDialog(error);
        return throwError(() => error);
      })
      );
  }

  private log(message: string){
    this.messageService.add(`BookingService: ${message}`);
  }

  private openErrorDialog(error: any): void {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
    });
  }
}
