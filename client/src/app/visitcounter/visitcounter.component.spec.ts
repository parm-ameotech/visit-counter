import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitcounterComponent } from './visitcounter.component';

describe('VisitcounterComponent', () => {
  let component: VisitcounterComponent;
  let fixture: ComponentFixture<VisitcounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitcounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitcounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
