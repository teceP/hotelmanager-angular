import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomAddComponent } from './components/room-add/room-add.component';
import { RoomEditComponent } from './components/room-edit/room-edit.component';
import { RoomSearchComponent } from './components/room-search/room-search.component';

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
