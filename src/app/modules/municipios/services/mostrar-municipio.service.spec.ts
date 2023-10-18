import { TestBed } from '@angular/core/testing';

import { MostrarMunicipioService } from './mostrar-municipio.service';

describe('MostrarMunicipioService', () => {
  let service: MostrarMunicipioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarMunicipioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
