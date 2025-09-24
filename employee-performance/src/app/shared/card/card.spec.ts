import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { EmployeeData } from '../../core/models/employeeData.model';
import { By } from '@angular/platform-browser';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  const mockEmployee: EmployeeData = {
    name: 'John Doe',
    position: 'Software Engineer',
    email: 'john@example.com',
    department: 'IT',
    totalExperience: 5,
    performanceScore: 85
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should render employee name', () => {
    const nameEl = fixture.debugElement.query(By.css('.card-header h4')).nativeElement;
    expect(nameEl.textContent).toContain(mockEmployee.name);
  });

  it('should render employee position', () => {
    const positionEl = fixture.debugElement.query(By.css('.card-header small')).nativeElement;
    expect(positionEl.textContent).toContain(mockEmployee.position);
  });

  it('should render employee email', () => {
    const emailEl = fixture.debugElement.query(By.css('.card-body p:nth-child(1)')).nativeElement;
    expect(emailEl.textContent).toContain(mockEmployee.email);
  });

  it('should render employee department', () => {
    const deptEl = fixture.debugElement.query(By.css('.card-body p:nth-child(2)')).nativeElement;
    expect(deptEl.textContent).toContain(mockEmployee.department);
  });

  it('should render total experience', () => {
    const expEl = fixture.debugElement.query(By.css('.card-body p:nth-child(3)')).nativeElement;
    expect(expEl.textContent).toContain(mockEmployee.totalExperience.toString());
  });

  it('should display correct performance score', () => {
    const scoreEl = fixture.debugElement.query(By.css('.score-badge')).nativeElement;
    expect(scoreEl.textContent).toContain(mockEmployee.performanceScore.toString());
  });
});
