import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RoomSearchComponent } from './room-search/room-search.component';
import { RoomAddComponent } from './room-add/room-add.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { BookingAddComponent } from './booking-add/booking-add.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    RoomSearchComponent,
    RoomAddComponent,
    RoomEditComponent,
    BookingAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    JsonPipe
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
