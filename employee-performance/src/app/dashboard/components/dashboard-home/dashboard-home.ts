import { Component } from '@angular/core';
import { Employee } from '../../../core/services/employee';
import { EmployeeData } from '../../../core/models/employeeData.model';
import { Chart } from '../../../shared/chart/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule, Chart],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome {
  employees: EmployeeData[] = [];
  chartLabels: string[] = [];
  chartData: number[] = [];
  showSlider: boolean = false;

  constructor(private employeeService: Employee) {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.updateChart(data);
      },
      (err) => {
        err.message || 'Something went wrong';
      }
    );
  }

  onAddEmployee(employee: EmployeeData): void {
    this.employeeService.addEmployee(employee);
    this.employees.push(employee);
    this.updateChart(this.employees);
  }

  updateChart(data: EmployeeData[]): void {
    this.chartLabels = data.map((emp) => emp.name);
    this.chartData = data.map((emp) => emp.performanceScore);
  }

  toggleSlider(): void {
    this.showSlider = !this.showSlider;
  }
}
