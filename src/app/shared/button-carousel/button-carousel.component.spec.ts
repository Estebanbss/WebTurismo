import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCarouselComponent } from './button-carousel.component';

describe('ButtonCarouselComponent', () => {
  let component: ButtonCarouselComponent;
  let fixture: ComponentFixture<ButtonCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCarouselComponent]
    });
    fixture = TestBed.createComponent(ButtonCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
