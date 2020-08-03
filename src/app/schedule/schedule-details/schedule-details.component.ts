import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ScheduleDetailsService } from './schedule-details.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {

  calendarOptions: CalendarOptions;
  eventsModel: any;

  currentEventClick:any;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  constructor(
    private scheduleService: ScheduleService,
    private scheduleDetailsService: ScheduleDetailsService
  ) {

    scheduleDetailsService.addScheduleEvent.subscribe(resp => {
      this.addEvent(JSON.parse(resp))
    })

    scheduleDetailsService.editScheduleEvent.subscribe(resp => {
      this.editEvent(JSON.parse(resp))
    })
  }

  ngOnInit() {
    this.calendarOptions = {
      plugins: [
        dayGridPlugin,
        timeGrigPlugin,
        interactionPlugin,
        listPlugin
      ],
      // customButtons: {
      //   addEventButton: {
      //     text: 'add event...',
      //     click: () => {
      //       var dateStr = prompt('Enter a date in YYYY-MM-DD format');
      //       var date = new Date(dateStr + 'T00:00:00'); // will be in local time

      //       if (!isNaN(date.valueOf())) { // valid?
      //         let calendarApi = this.fullcalendar.getApi()
      //         calendarApi.addEvent({
      //           title: 'dynamic event',
      //           start: date,
      //           allDay: true
      //         });
      //         alert('Great. Now, update your database...');
      //       } else {
      //         alert('Invalid date.');
      //       }
      //     }
      //   }
      // },
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth listDay,listWeek,listMonth'
      },
      initialView: 'timeGridDay',

      // customize the button names,
      // otherwise they'd all just say "list"
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' },
        listMonth: { buttonText: 'list month' }
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this)
    };
  }

  handleDateClick(arg) {
    console.log(arg);
    this.scheduleDetailsService.setSelectedDate(JSON.stringify(arg))
    this.scheduleDetailsService.setAddScheduleStatus(true)
  }

  handleEventClick(arg : EventClickArg) {
    if(!this.scheduleDetailsService.getEditScheduleStatus())
    {
      console.log(arg);

      this.currentEventClick = arg

      this.scheduleDetailsService.setSelectedEvent(JSON.stringify(arg))
      this.scheduleDetailsService.setEditScheduleStatus(true)
    }
  }

  addEvent(event) {

    let calendarApi = this.fullcalendar.getApi()

    if(event.all_day){
      calendarApi.addEvent({
        title: event.title,
        start: event.start_date,
        end: event.end_date,
        allDay: true
      });
    }
    else if(!event.all_day){
      calendarApi.addEvent({
        title: event.title,
        start: event.start_date + " " + event.start_time,
        end: event.end_date + " " + event.end_time,
        allDay: false
      });
    }

    this.scheduleService.setCloseSidenav()
    this.scheduleDetailsService.setAddScheduleStatus(false)
  }

  editEvent(event){

    console.log(JSON.stringify(event.selectedEvent))
    this.currentEventClick.event.setProp("title", event.title)
    this.currentEventClick.event.setDates(event.start_date + " " + event.start_time, event.end_date + " " + event.end_time)
    this.scheduleService.setCloseSidenav()
    this.scheduleDetailsService.setEditScheduleStatus(false)
  }
}
