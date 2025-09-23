import { Component, Input } from '@angular/core';
import { EmployeeData } from '../../core/models/employeeData.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() employee!: EmployeeData;

}
