import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouriteProgramsPageComponent } from './user-favourite-programs-page.component';

describe('UserFavouriteProgramsPageComponent', () => {
  let component: UserFavouriteProgramsPageComponent;
  let fixture: ComponentFixture<UserFavouriteProgramsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFavouriteProgramsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavouriteProgramsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
