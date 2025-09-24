import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form } from './form';
import { ReactiveFormsModule } from '@angular/forms';

describe('EmployeeFormComponent', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Form],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with default empty values', () => {
    expect(component).toBeTruthy();
    const form = component.employeeForm;
    expect(form).toBeDefined();
    expect(form.valid).toBeFalse();
    expect(form.get('name')?.value).toBe('');
  });

  it('should make name control required', () => {
    const control = component.employeeForm.get('name');
    control?.setValue('');
    expect(control?.invalid).toBeTrue();
    control?.setValue('John Doe');
    expect(control?.valid).toBeTrue();
  });

  it('should validate email properly', () => {
    const control = component.employeeForm.get('email');
    control?.setValue('invalidEmail');
    expect(control?.invalid).toBeTrue();

    control?.setValue('valid@email.com');
    expect(control?.valid).toBeTrue();
  });

  it('should not allow negative totalExperience', () => {
    const control = component.employeeForm.get('totalExperience');
    control?.setValue(-2);
    expect(control?.invalid).toBeTrue();

    control?.setValue(5);
    expect(control?.valid).toBeTrue();
  });

  it('should not allow performanceScore less than 0 or greater than 100', () => {
    const control = component.employeeForm.get('performanceScore');
    control?.setValue(-1);
    expect(control?.invalid).toBeTrue();

    control?.setValue(120);
    expect(control?.invalid).toBeTrue();

    control?.setValue(85);
    expect(control?.valid).toBeTrue();
  });

  it('should emit event with form value when valid form is submitted', () => {
    spyOn(component.submitForm, 'emit');

    component.employeeForm.setValue({
      name: 'John Doe',
      position: 'Developer',
      email: 'john@example.com',
      department: 'IT',
      totalExperience: 5,
      performanceScore: 90
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      name: 'John Doe',
      position: 'Developer',
      email: 'john@example.com',
      department: 'IT',
      totalExperience: 5,
      performanceScore: 90
    });

    // After submit → form should reset
    expect(component.employeeForm.value).toEqual({
      name: null,
      position: null,
      email: null,
      department: null,
      totalExperience: null,
      performanceScore: null
    });
  });

  it('should not emit if form is invalid', () => {
    spyOn(component.submitForm, 'emit');

    component.employeeForm.setValue({
      name: '',
      position: '',
      email: 'not-an-email',
      department: '',
      totalExperience: -1,
      performanceScore: 200
    });

    component.onSubmit();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });
});
