import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEducationComponent } from './page-education.component';

describe('PageEducationComponent', () => {
  let component: PageEducationComponent;
  let fixture: ComponentFixture<PageEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
