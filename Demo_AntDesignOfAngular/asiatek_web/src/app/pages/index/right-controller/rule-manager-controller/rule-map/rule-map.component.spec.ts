import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleMapComponent } from './rule-map.component';

describe('RuleMapComponent', () => {
  let component: RuleMapComponent;
  let fixture: ComponentFixture<RuleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
