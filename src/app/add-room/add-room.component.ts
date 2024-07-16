import { Component } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {

  exeption: string = "";

  constructor(private roomService: RoomService, private messageService: MessageService, private router: Router) {}

  addRoom(name: string, description: string, hasMinibar: boolean, roomSize: string): void {
    name = name.trim();
    if (!name) { return; }
    this.roomService.addRoom({name, description, hasMinibar, roomSize} as Room)
      .pipe(
        tap(room => this.router.navigateByUrl(`/details/${room.id}`)),
        catchError(this.handleError<Room>('addRoom'))
      ).subscribe();
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

      this.exeption = error.message;
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
