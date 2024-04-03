import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterationFormComponent } from './student-registeration-form.component';

describe('StudentRegisterationFormComponent', () => {
  let component: StudentRegisterationFormComponent;
  let fixture: ComponentFixture<StudentRegisterationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRegisterationFormComponent]
    });
    fixture = TestBed.createComponent(StudentRegisterationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
