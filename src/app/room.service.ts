import { Injectable } from '@angular/core';
import { Room } from './room';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private hotelmanagerUrl = '/url/api/rooms';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    private dialog: MatDialog) { }

  getRooms(): Observable<Room[]>{
    this.messageService.add('RoomService: fetched rooms')
    return this.http.get<Room[]>(this.hotelmanagerUrl)
      .pipe(
        tap(rooms => this.log(`fetched rooms: %${rooms.forEach(r => this.log(`${r.id} ${r.name} ${r.description}`))}`)),
        catchError(error => {
          this.openErrorDialog(error.message + ", " + error.error.error);
          return throwError(() => error);
        })
      );
  }

  getRoom(id: number): Observable<Room> {
    const url = `${this.hotelmanagerUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      tap(_ => this.log(`fetched room id=${id}`)),
      catchError(error => {
        this.openErrorDialog(error.message + ", " + error.error.error);
        return throwError(() => error);
      })
    );
  }

  updateRoom(room: Room): Observable<any> {
    return this.http.put(this.hotelmanagerUrl, room, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated room id=${room.id}`)),
        catchError(error => {
          this.openErrorDialog(error.message + ", " + error.error.error);
          return throwError(() => error);
        })
      );
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.hotelmanagerUrl, room, this.httpOptions)
      .pipe(
        tap((newRoom: Room) => this.log(`added room w/ id=${newRoom.id}`)),
        catchError(error => {
          this.openErrorDialog(error.message + ", " + error.error.error);
          return throwError(() => error);
        })
      );
  }

  deleteRoom(id: number): Observable<Room> {
    const url = `${this.hotelmanagerUrl}/${id}`
    this.log(`del url: ${url}`)

    return this.http.delete<Room>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted room id=${id}`)),
      catchError(error => {
        this.openErrorDialog(error.message + ", " + error.error.error);
        return throwError(() => error);
      })
    )
  }

  searchRooms(name: string, description?: string, startDate?: Date, endDate?: Date, hasMinibar?: string, roomSize?: string): Observable<Room[]>{

      let params: string[] = [`name=${encodeURIComponent(name)}`];
      this.log('hello?');

      if (description) {
        params.push(`description=${encodeURIComponent(description)}`);
      }
      if (startDate) {
        params.push(`startDate=${startDate.toISOString().split("T")[0]}`);
      }
      if (endDate) {
        params.push(`endDate=${endDate.toISOString().split("T")[0]}`);
      }
      if (hasMinibar) {
        params.push(`hasMinibar=${hasMinibar}`);
      }
      if (roomSize){
        params.push(`roomSize=${roomSize.toUpperCase()}`);
      }

      const queryString = params.join('&');
      const url = `${this.hotelmanagerUrl}/filter?${queryString}`;
      console.log('Query: ' + url);

      return this.http.get<Room[]>(url).pipe(
        tap(x => x.length ? this.log("found rooms matching") : this.log('no rooms matching')),
        catchError(error => {
          this.openErrorDialog(error.message + ", " + error.error.error);
          return throwError(() => error);
        })
      );
  }

  private log(message: string){
    this.messageService.add(`RoomService: ${message}`);
  }


  private openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {message: errorMessage}
    });
  }
}
