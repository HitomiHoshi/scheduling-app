import { Component, OnInit } from '@angular/core';
import { ScheduleDetailsService } from '../schedule-details/schedule-details.service';
import { ScheduleService } from '../schedule.service';
import { formatDate } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface Time {
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  title: string = '';
  startDate;
  endDate;
  startTimePicker: Time;
  endTimePicker: Time;
  wholeDay:boolean;
  selectedDate:any;

  horizontalPosition: MatSnackBarHorizontalPosition = "right"
  verticalPosition: MatSnackBarVerticalPosition = "top"

  constructor(
    private scheduleDetailsService: ScheduleDetailsService,
    private scheduleService: ScheduleService,

    private snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.selectedDate = JSON.parse(this.scheduleDetailsService.getSelectedDate())

    let startTime = this.selectedDate.dateStr.substring(11, 19);
    this.startDate = this.selectedDate.dateStr.substring(0, 10);
    this.endDate = this.selectedDate.dateStr.substring(0, 10);
    this.wholeDay = this.selectedDate.allDay

    this.startTimePicker = this.scheduleService.getTimeFromString(startTime)
    this.endTimePicker = this.scheduleService.getTimeFromString(startTime)

    if (this.selectedDate.allDay) {
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

    console.log(this.selectedDate)
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
    this.scheduleDetailsService.setSelectedDate(JSON.stringify({}))
    this.scheduleDetailsService.setAddScheduleStatus(false)
    this.scheduleService.setCloseSidenav()
  }

  validateAddSchedule(){
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
      this.addSchedule()
    }
  }

  addSchedule() {
    const sendThis = {
      title:this.title,
      start_date: formatDate(this.startDate, 'yyyy-MM-dd', 'en-US'),
      start_time: (this.startTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.startTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
      end_date: formatDate(this.endDate, 'yyyy-MM-dd', 'en-US'),
      end_time: (this.endTimePicker.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + (this.endTimePicker.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
      all_day: this.wholeDay,
    }

    this.scheduleDetailsService.setAddScheduleEvent(JSON.stringify(sendThis))
  }
}
