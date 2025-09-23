import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, throwError } from 'rxjs';
import { EmployeeData } from '../models/employeeData.model';

@Injectable({
  providedIn: 'root'
})
export class Employee {
  private employees$ = new BehaviorSubject<EmployeeData[]>([
    { id: 4200, name: 'John Doe', position: 'Developer', email: 'john@gmail.com', department:'ITIM', totalExperience: 4,performanceScore: 80 },
    { id: 4201, name: 'Jane Smith', position: 'Designer', email: 'john@gmail.com', department:'ITIM', totalExperience: 5,performanceScore: 90 },
  ]);

  getEmployees(): Observable<EmployeeData[]> {
    return this.employees$.asObservable().pipe(
      delay(500),
      catchError(err => throwError(() => new Error('Failed to fetch employees')))
    );
  }

  addEmployee(employee: EmployeeData): void {
    const current = this.employees$.getValue();
    this.employees$.next([...current, { ...employee, id: current.length + 1 }]);
  }
  
}
