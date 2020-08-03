import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  @Output() closeSidenav: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setCloseSidenav(){
    this.closeSidenav.emit()
  }

  getTimeFromString(strDate) {
    let arr = strDate.split(':');
    return { hour: parseInt(arr[0]), minute: parseInt(arr[1]), second: parseInt(arr[2]) };
  }
}
