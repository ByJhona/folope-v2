import { TestBed } from '@angular/core/testing';

import { AutenticacaoService } from './autenticacao-service';

describe('Auth', () => {
  let service: AutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoService);
  });

  it('Serviço deve ser iniciado', () => {
    expect(service).toBeTruthy();
  });
});
