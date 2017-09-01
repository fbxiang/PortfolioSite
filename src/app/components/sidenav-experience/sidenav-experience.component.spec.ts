import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavExperienceComponent } from './sidenav-experience.component';

describe('SidenavExperienceComponent', () => {
  let component: SidenavExperienceComponent;
  let fixture: ComponentFixture<SidenavExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
