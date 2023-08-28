import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNutritionProgramsUserComponent } from './daily-nutrition-programs-user.component';

describe('DailyNutritionProgramsUserComponent', () => {
  let component: DailyNutritionProgramsUserComponent;
  let fixture: ComponentFixture<DailyNutritionProgramsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyNutritionProgramsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyNutritionProgramsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
