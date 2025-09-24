import { Component } from '@angular/core';
import { EmployeeData } from '../../../core/models/employeeData.model';
import { Employee } from '../../../core/services/employee';
import { CommonModule } from '@angular/common';
import { Form } from '../../../shared/form/form';

@Component({
  selector: 'app-settings-home',
  imports: [Form, CommonModule],
  templateUrl: './settings-home.html',
  styleUrl: './settings-home.scss'
})
export class SettingsHome {
  constructor(private employeeService: Employee) {

  }

  onAddEmployee(employee: EmployeeData):void {
      this.employeeService.addEmployee(employee);
    }

}
