import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalSetComponent } from './terminal-set.component';

describe('TerminalSetComponent', () => {
  let component: TerminalSetComponent;
  let fixture: ComponentFixture<TerminalSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
