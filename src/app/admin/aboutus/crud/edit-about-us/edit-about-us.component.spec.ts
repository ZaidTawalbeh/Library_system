import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutUsComponent } from './edit-about-us.component';

describe('EditAboutUsComponent', () => {
  let component: EditAboutUsComponent;
  let fixture: ComponentFixture<EditAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAboutUsComponent]
    });
    fixture = TestBed.createComponent(EditAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
