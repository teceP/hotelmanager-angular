import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Room } from '../../model/room';
import { RoomService } from '../../service/room.service';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrl: './room-search.component.css'
})

export class RoomSearchComponent implements OnInit {

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  searchForm: FormGroup;
  rooms: Room[] = [];
  roomTotalCount$ = new BehaviorSubject<number>(0);

  constructor(private roomService: RoomService, private formBuilder: FormBuilder) {
    this.searchForm =  this.formBuilder.group({
      name: [''],
      description: [''],
      startDate: [''],
      endDate: [''],
      hasMinibar: [''],
      roomSize: ['']
    });
  }

  search(): void{
    const formData = this.searchForm.value;
    const { name, description, hasMinibar, roomSize} = formData;
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;

    // Check if any filter is set, if not return all rooms
    if (!name.trim() && !description && !startDate && !endDate && !hasMinibar && !roomSize) {
      this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
      console.log('No filter is set, return alle rooms.');
      return;
    }

    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;

    console.log(formData);
    this.roomService.searchRooms(name, description, startDateObj, endDateObj, hasMinibar, roomSize)
      .pipe(tap(rooms => {
        this.rooms = rooms;
        console.log('Found rooms:', rooms);
      }), catchError(error => {
        console.error('Error Searching rooms:', error);
        throw error; // Weiterhin den Fehler werfen, um ihn in der Komponente zu behandeln
      })).subscribe();
  }

  countTotalRooms(): void{
    this.roomService.getRooms().subscribe(rooms => {
      this.roomTotalCount$.next(rooms.length);
    });
  }

  ngOnInit(): void{
    this.roomService.getRooms().subscribe(rooms => this.rooms = rooms);
    this.countTotalRooms();
  }

  firstCharUpper(s?: string): string{
    if (!s) return ''; 
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}
