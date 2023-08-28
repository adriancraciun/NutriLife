import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRegularUserComponent } from './profile-regular-user.component';

describe('ProfileRegularUserComponent', () => {
  let component: ProfileRegularUserComponent;
  let fixture: ComponentFixture<ProfileRegularUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRegularUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRegularUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
