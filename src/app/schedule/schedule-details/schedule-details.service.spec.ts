import { TestBed } from '@angular/core/testing';

import { ScheduleDetailsService } from './schedule-details.service';

describe('ScheduleDetailsService', () => {
  let service: ScheduleDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
