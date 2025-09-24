import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Employee } from './employee';
import { EmployeeData } from '../models/employeeData.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

describe('Employee', () => {
  let service: Employee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial employees from getEmployees()', fakeAsync(() => {
    let employees: EmployeeData[] | undefined;
    service.getEmployees().pipe(take(1)).subscribe(e => employees = e);

    // simulate the delay(500)
    tick(500);

    expect(employees?.length).toBe(2);
    expect(employees?.[0].name).toBe('John Doe');
    expect(employees?.[1].name).toBe('Jane Smith');
  }));

  it('should add a new employee', fakeAsync(() => {
    const newEmp: EmployeeData = {
      id: 0, // id will be assigned automatically
      name: 'Alice',
      position: 'Tester',
      email: 'alice@gmail.com',
      department: 'QA',
      totalExperience: 2,
      performanceScore: 75
    };

    service.addEmployee(newEmp);

    let employees: EmployeeData[] | undefined;
    service.getEmployees().pipe(take(1)).subscribe(e => employees = e);

    tick(500);

    expect(employees?.length).toBe(3);
    expect(employees?.[2].name).toBe('Alice');
    expect(employees?.[2].id).toBe(3); // auto-assigned
  }));

  it('should handle error in getEmployees()', fakeAsync(() => {
    // Spy on the BehaviorSubject and force it to throw error
    spyOn(service['employees$'], 'asObservable').and.returnValue(
      new Observable(observer => {
        observer.error('Simulated error');
      })
    );

    let errorResponse: any;
    service.getEmployees().subscribe({
      next: () => {},
      error: err => (errorResponse = err)
    });

    tick(500);

    expect(errorResponse).toBeTruthy();
    expect(errorResponse.message).toBe('Failed to fetch employees');
  }));
});
