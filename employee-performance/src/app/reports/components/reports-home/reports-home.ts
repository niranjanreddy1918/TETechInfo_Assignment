import { Component } from '@angular/core';
import { Employee } from '../../../core/services/employee';
import { EmployeeData } from '../../../core/models/employeeData.model';
import { Card } from '../../../shared/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-home',
  imports: [Card, CommonModule],
  templateUrl: './reports-home.html',
  styleUrl: './reports-home.scss'
})
export class ReportsHome {
  employees: EmployeeData[] = [];
  
  constructor(private employeeService: Employee) {
      this.employeeService.getEmployees().subscribe(data => {
        this.employees = data;
      },
      (err) => {
        err.message || 'Something went wrong';
      }
    );
    }

}
