import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleFromComponent } from './rule-from.component';

describe('RuleFromComponent', () => {
  let component: RuleFromComponent;
  let fixture: ComponentFixture<RuleFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
