import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLibraryCategoriesComponent } from './edit-library-categories.component';

describe('EditLibraryCategoriesComponent', () => {
  let component: EditLibraryCategoriesComponent;
  let fixture: ComponentFixture<EditLibraryCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLibraryCategoriesComponent]
    });
    fixture = TestBed.createComponent(EditLibraryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
