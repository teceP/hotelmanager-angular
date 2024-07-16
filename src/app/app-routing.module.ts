import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { RoomSearchComponent } from './room-search/room-search.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'details/:id', component: RoomDetailsComponent},
  {path: 'add', component: AddRoomComponent},
  {path: 'edit/:id', component: EditRoomComponent},
  {path: 'search', component: RoomSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
