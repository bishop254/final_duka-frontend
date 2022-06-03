import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let toastrMock: any;

  beforeEach(() => {
    service = new NotificationsService(toastrMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
