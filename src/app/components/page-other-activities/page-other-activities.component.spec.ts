import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOtherActivitiesComponent } from './page-other-activities.component';

describe('PageOtherActivitiesComponent', () => {
  let component: PageOtherActivitiesComponent;
  let fixture: ComponentFixture<PageOtherActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOtherActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOtherActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
