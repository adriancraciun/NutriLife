import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPageUserComponent } from './plan-page-user.component';

describe('PlanPageUserComponent', () => {
  let component: PlanPageUserComponent;
  let fixture: ComponentFixture<PlanPageUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPageUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
