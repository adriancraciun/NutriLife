import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouriteProgramsComponent } from './user-favourite-programs.component';

describe('UserFavouriteProgramsComponent', () => {
  let component: UserFavouriteProgramsComponent;
  let fixture: ComponentFixture<UserFavouriteProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavouriteProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavouriteProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
