import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDetailsComponent } from './schedule/schedule-details/schedule-details.component';
import { AddScheduleComponent } from './schedule/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './schedule/edit-schedule/edit-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    ScheduleDetailsComponent,
    AddScheduleComponent,
    EditScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
