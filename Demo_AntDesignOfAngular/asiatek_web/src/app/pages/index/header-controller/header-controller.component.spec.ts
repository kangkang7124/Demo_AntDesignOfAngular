import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderControllerComponent } from './header-controller.component';

describe('HeaderControllerComponent', () => {
  let component: HeaderControllerComponent;
  let fixture: ComponentFixture<HeaderControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
