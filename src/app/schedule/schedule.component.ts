import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleDetailsService } from './schedule-details/schedule-details.service';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  addStatus: boolean = false;
  editStatus: boolean = false;

  @ViewChild('sidenavright') sidenavright;

  constructor(
    private scheduleDetailsService: ScheduleDetailsService,
    private scheduleService: ScheduleService,
  ) { 
    scheduleService.closeSidenav.subscribe(() => {
      this.closeSideNavRight()
    })

    scheduleDetailsService.addScheduleStatus.subscribe(resp => {
      this.addStatus = resp

      if(resp){
        this.editStatus = !resp
        this.openSideNavRight()
      }
      
    })
    
    scheduleDetailsService.editScheduleStatus.subscribe(resp => {
      this.editStatus = resp

      if(resp){
        this.addStatus = !resp
        this.openSideNavRight()
      }
    })
  }

  ngOnInit(): void {
  }

  openSideNavRight(){
    this.sidenavright.open()
  }

  closeSideNavRight(){
    this.sidenavright.close()
  }
}
