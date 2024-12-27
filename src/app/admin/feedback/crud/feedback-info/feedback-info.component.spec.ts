import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInfoComponent } from './feedback-info.component';

describe('FeedbackInfoComponent', () => {
  let component: FeedbackInfoComponent;
  let fixture: ComponentFixture<FeedbackInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackInfoComponent]
    });
    fixture = TestBed.createComponent(FeedbackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
