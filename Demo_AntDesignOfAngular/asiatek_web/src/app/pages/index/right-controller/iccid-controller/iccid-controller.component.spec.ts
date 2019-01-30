import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IccidControllerComponent } from './iccid-controller.component';

describe('IccidControllerComponent', () => {
  let component: IccidControllerComponent;
  let fixture: ComponentFixture<IccidControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IccidControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IccidControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
