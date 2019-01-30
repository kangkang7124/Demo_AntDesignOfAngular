import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLineControllerComponent } from './history-line-controller.component';

describe('HistoryLineControllerComponent', () => {
  let component: HistoryLineControllerComponent;
  let fixture: ComponentFixture<HistoryLineControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryLineControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLineControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
