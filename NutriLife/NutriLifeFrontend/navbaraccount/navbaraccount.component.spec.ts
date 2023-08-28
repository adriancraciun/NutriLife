import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaraccountComponent } from './navbaraccount.component';

describe('NavbaraccountComponent', () => {
  let component: NavbaraccountComponent;
  let fixture: ComponentFixture<NavbaraccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbaraccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbaraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
