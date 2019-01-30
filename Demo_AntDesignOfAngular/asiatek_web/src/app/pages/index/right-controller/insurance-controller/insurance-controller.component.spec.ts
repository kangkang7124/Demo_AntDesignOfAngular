import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceControllerComponent } from './insurance-controller.component';

describe('InsuranceControllerComponent', () => {
  let component: InsuranceControllerComponent;
  let fixture: ComponentFixture<InsuranceControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
