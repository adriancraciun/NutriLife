import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgramsPageComponent } from './user-programs-page.component';

describe('UserProgramsPageComponent', () => {
  let component: UserProgramsPageComponent;
  let fixture: ComponentFixture<UserProgramsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProgramsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgramsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
