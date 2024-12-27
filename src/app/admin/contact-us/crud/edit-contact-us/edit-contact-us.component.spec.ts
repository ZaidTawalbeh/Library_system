import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactUsComponent } from './edit-contact-us.component';

describe('EditContactUsComponent', () => {
  let component: EditContactUsComponent;
  let fixture: ComponentFixture<EditContactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactUsComponent]
    });
    fixture = TestBed.createComponent(EditContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
