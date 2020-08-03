import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDetailsService {

  SelectedDate
  SelectedEvent
  EditScheduleStatus

  @Output() selectedDate: EventEmitter<any> = new EventEmitter();
  @Output() addScheduleStatus: EventEmitter<any> = new EventEmitter();
  @Output() addScheduleEvent: EventEmitter<any> = new EventEmitter();
  @Output() editScheduleStatus: EventEmitter<any> = new EventEmitter();
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();
  @Output() editScheduleEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setAddScheduleStatus(status){
    this.addScheduleStatus.emit(status)
  }

  setSelectedDate(selected){
    this.selectedDate.emit(selected)
    this.SelectedDate = selected
  }

  getSelectedDate(){
    return this.SelectedDate
  }

  setAddScheduleEvent(event){
    this.addScheduleEvent.emit(event)
  }

  setEditScheduleStatus(status){
    this.editScheduleStatus.emit(status)
    this.EditScheduleStatus = status
  }

  getEditScheduleStatus(){
    return this.EditScheduleStatus
  }

  setSelectedEvent(selected){
    this.selectedEvent.emit(selected)
    this.SelectedEvent = selected
  }

  setEditScheduleEvent(event){
    this.editScheduleEvent.emit(event)
  }

  getSelectedEvent(){
    return this.SelectedEvent
  }
}
