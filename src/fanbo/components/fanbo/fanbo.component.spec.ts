import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanboComponent } from './fanbo.component';

describe('FanboComponent', () => {
  let component: FanboComponent;
  let fixture: ComponentFixture<FanboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
