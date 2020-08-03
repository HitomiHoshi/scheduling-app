import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ScheduleService } from '../schedule.service';
import { ScheduleDetailsService } from '../schedule-details/schedule-details.service';
import { formatDate } from '@angular/common';

export interface Time {
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  title: string = '';
  startDate;
  endDate;
  startTimePicker: Time;
  endTimePicker: Time;
  wholeDay:boolean;
  selectedEvent:any;

  horizontalPosition: MatSnackBarHorizontalPosition = "right"
  verticalPosition: MatSnackBarVerticalPosition = "top"

  constructor(
    private scheduleDetailsService: ScheduleDetailsService,
    private scheduleService: ScheduleService,

    private snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.selectedEvent = JSON.parse(this.scheduleDetailsService.getSelectedEvent())

    console.log(this.selectedEvent.el.fcSeg.eventRange.def)
    this.title = this.selectedEvent.event.title
    let startTime = this.selectedEvent.event.start.substring(11, 19);
    this.startDate = this.selectedEvent.event.start.substring(0, 10);
    let endTime = this.selectedEvent.event.end.substring(11, 19);
    this.endDate = this.selectedEvent.event.end.substring(0, 10);
    this.wholeDay = this.selectedEvent.el.fcSeg.eventRange.def.allDay

    this.startTimePicker = this.scheduleService.getTimeFromString(startTime)
    this.endTimePicker = this.scheduleService.getTimeFromString(endTime)

    if (this.selectedEvent.el.fcSeg.eventRange.def.allDay) {
      let arr = this.endDate.split('-');
      let datestring = parseInt(arr[1]) + "/" + parseInt(arr[2]) + "/" + parseInt(arr[0])
      let tempDate = new Date(datestring)
      let newtemp = new Date(tempDate.getTime() + (1000 * 60 * 60 * 24))
      console.log("tempDate", tempDate)

      this.endDate = formatDate(newtemp, 'yyyy-MM-dd', 'en-US')
      startTime = "00:00:00"

      this.startTimePicker = this.scheduleService.getTimeFromString(startTime)
      this.endTimePicker = this.scheduleService.getTimeFromString(startTime)
      console.log("after", this.endDate)
    }
  }

  wholeDayChange(event) {
    console.log(event)
    if (event.checked) {
      this.startTimePicker = { hour: 0, minute: 0, second: 0 }
      this.endTimePicker = { hour: 0, minute: 0, second: 0 }

      let stampStart = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') + ' ' + (this.startTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
      let stampEnd = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US') + ' ' + (this.endTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

      let schedule_duration = new Date(stampEnd).getTime() - new Date(stampStart).getTime()

      if (schedule_duration == 0) {
        let temp = new Date(this.startDate).getTime() + (1000 * 60 * 60 * 24)
        this.endDate = formatDate(temp, 'yyyy-MM-dd', 'en-US')
      }
    }
  }

  cancel() {
    this.scheduleDetailsService.setSelectedEvent(JSON.stringify({}))
    this.scheduleDetailsService.setEditScheduleStatus(false)
    this.scheduleService.setCloseSidenav()
  }

  validateEditSchedule(){
    let stampStart = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US') + ' ' + (this.startTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    let stampEnd = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US') + ' ' + (this.endTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

    let schedule_duration = new Date(stampEnd).getTime() - new Date(stampStart).getTime()

    if(this.title == ''){
      this.snackBar.open('Please enter schedule title', "X", {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
      console.log("Please enter schedule title")
    }
    else if (schedule_duration <= 0) {
      this.snackBar.open('Please choose valid range date and time schedule', "X", {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      })
      console.log("please choose valid range date and time schedule")
    }
    else{
      this.editSchedule()
    }
  }

  editSchedule() {
    const sendThis = {
      selectedEvent:this.selectedEvent,
      title:this.title,
      start_date: formatDate(this.startDate, 'yyyy-MM-dd', 'en-US'),
      start_time: (this.startTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
      end_date: formatDate(this.endDate, 'yyyy-MM-dd', 'en-US'),
      end_time: (this.endTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
      all_day: this.wholeDay,
    }

    this.scheduleDetailsService.setEditScheduleEvent(JSON.stringify(sendThis))
  }

}
