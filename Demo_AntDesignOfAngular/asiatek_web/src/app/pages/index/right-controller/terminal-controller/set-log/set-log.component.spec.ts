import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLogComponent } from './set-log.component';

describe('SetLogComponent', () => {
  let component: SetLogComponent;
  let fixture: ComponentFixture<SetLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
