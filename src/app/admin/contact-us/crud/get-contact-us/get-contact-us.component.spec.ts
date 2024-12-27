import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContactUsComponent } from './get-contact-us.component';

describe('GetContactUsComponent', () => {
  let component: GetContactUsComponent;
  let fixture: ComponentFixture<GetContactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetContactUsComponent]
    });
    fixture = TestBed.createComponent(GetContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
