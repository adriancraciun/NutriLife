import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNutritionProgramsComponent } from './daily-nutrition-programs.component';

describe('DailyNutritionProgramsComponent', () => {
  let component: DailyNutritionProgramsComponent;
  let fixture: ComponentFixture<DailyNutritionProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyNutritionProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyNutritionProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
