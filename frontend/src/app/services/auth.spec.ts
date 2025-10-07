import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';

describe('Auth', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('Serviço deve ser iniciado', () => {
    expect(service).toBeTruthy();
  });
});
