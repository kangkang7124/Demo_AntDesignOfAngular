import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleManagerControllerComponent } from './rule-manager-controller.component';

describe('RuleManagerControllerComponent', () => {
  let component: RuleManagerControllerComponent;
  let fixture: ComponentFixture<RuleManagerControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleManagerControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleManagerControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
