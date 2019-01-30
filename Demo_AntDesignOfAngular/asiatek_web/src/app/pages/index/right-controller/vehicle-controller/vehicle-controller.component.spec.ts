import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleControllerComponent } from './vehicle-controller.component';

describe('VehicleControllerComponent', () => {
  let component: VehicleControllerComponent;
  let fixture: ComponentFixture<VehicleControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
