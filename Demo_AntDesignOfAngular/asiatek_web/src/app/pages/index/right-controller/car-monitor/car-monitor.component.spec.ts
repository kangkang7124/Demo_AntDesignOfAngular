import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMonitorComponent } from './car-monitor.component';

describe('CarMonitorComponent', () => {
  let component: CarMonitorComponent;
  let fixture: ComponentFixture<CarMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
