import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleListOperationComponent } from './rule-list-operation.component';

describe('RuleListOperationComponent', () => {
  let component: RuleListOperationComponent;
  let fixture: ComponentFixture<RuleListOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleListOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleListOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
