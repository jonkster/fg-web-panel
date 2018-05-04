import { TestBed, inject } from '@angular/core/testing';

import { FgService } from './fg.service';

describe('FgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FgService]
    });
  });

  it('should be created', inject([FgService], (service: FgService) => {
    expect(service).toBeTruthy();
  }));
});
