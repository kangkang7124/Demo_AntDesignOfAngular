import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDispatchComponent } from './car-dispatch.component';

describe('CarDispatchComponent', () => {
  let component: CarDispatchComponent;
  let fixture: ComponentFixture<CarDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
