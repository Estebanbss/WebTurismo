import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadorComponent } from './prestador.component';

describe('PrestadorComponent', () => {
  let component: PrestadorComponent;
  let fixture: ComponentFixture<PrestadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestadorComponent]
    });
    fixture = TestBed.createComponent(PrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
