import { TestBed } from '@angular/core/testing';

import { HttpUtil } from './http.utils';

describe('HttpUtil', () => {
  let service: HttpUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
