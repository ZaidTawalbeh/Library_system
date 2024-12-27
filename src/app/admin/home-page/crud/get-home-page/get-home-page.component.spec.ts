import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHomePageComponent } from './get-home-page.component';

describe('GetHomePageComponent', () => {
  let component: GetHomePageComponent;
  let fixture: ComponentFixture<GetHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetHomePageComponent]
    });
    fixture = TestBed.createComponent(GetHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
