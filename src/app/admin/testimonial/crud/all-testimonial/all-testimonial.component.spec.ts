import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTestimonialComponent } from './all-testimonial.component';

describe('AllTestimonialComponent', () => {
  let component: AllTestimonialComponent;
  let fixture: ComponentFixture<AllTestimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTestimonialComponent]
    });
    fixture = TestBed.createComponent(AllTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
