import { Component } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RoomService } from '../../service/room.service';
import { MessageService } from '../../service/message.service';
import { Room } from '../../model/room';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrl: './room-add.component.css'
})
export class RoomAddComponent {

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
