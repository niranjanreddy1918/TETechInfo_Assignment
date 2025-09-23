import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsHome } from './reports-home';

describe('ReportsHome', () => {
  let component: ReportsHome;
  let fixture: ComponentFixture<ReportsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
