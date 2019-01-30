import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAgencyCtrComponent } from './child-agency-ctr.component';

describe('ChildAgencyCtrComponent', () => {
  let component: ChildAgencyCtrComponent;
  let fixture: ComponentFixture<ChildAgencyCtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAgencyCtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAgencyCtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
