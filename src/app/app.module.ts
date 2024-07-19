import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { DebugMessagesComponent } from './components/debug-messages/debug-messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RoomSearchComponent } from './components/room-search/room-search.component';
import { RoomAddComponent } from './components/room-add/room-add.component';
import { RoomEditComponent } from './components/room-edit/room-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, JsonPipe } from '@angular/common';
import { BookingAddComponent } from './components/booking-add/booking-add.component';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomDetailsComponent,
    DebugMessagesComponent,
    DashboardComponent,
    RoomSearchComponent,
    RoomAddComponent,
    RoomEditComponent,
    BookingAddComponent,
    SuccessDialogComponent
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
    JsonPipe,
    CommonModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
