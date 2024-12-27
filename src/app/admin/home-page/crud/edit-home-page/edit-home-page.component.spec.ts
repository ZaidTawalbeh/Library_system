import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomePageComponent } from './edit-home-page.component';

describe('EditHomePageComponent', () => {
  let component: EditHomePageComponent;
  let fixture: ComponentFixture<EditHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHomePageComponent]
    });
    fixture = TestBed.createComponent(EditHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
