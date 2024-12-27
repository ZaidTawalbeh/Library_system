import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAboutUsComponent } from './get-about-us.component';

describe('GetAboutUsComponent', () => {
  let component: GetAboutUsComponent;
  let fixture: ComponentFixture<GetAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAboutUsComponent]
    });
    fixture = TestBed.createComponent(GetAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
