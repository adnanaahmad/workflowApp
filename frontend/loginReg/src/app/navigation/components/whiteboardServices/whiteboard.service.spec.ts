import { TestBed } from '@angular/core/testing';

import { WhiteboardService } from './whiteboard.service';

describe('WhiteboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhiteboardService = TestBed.get(WhiteboardService);
    expect(service).toBeTruthy();
  });
});
