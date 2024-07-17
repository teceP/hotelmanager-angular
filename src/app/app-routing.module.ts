import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { RoomSearchComponent } from './room-search/room-search.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'details/:id', component: RoomDetailsComponent},
  {path: 'add', component: RoomAddComponent},
  {path: 'edit/:id', component: RoomEditComponent},
  {path: 'search', component: RoomSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
