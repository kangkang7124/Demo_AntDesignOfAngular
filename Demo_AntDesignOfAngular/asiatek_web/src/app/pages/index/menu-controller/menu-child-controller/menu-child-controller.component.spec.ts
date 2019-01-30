import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChildControllerComponent } from './menu-child-controller.component';

describe('MenuChildControllerComponent', () => {
  let component: MenuChildControllerComponent;
  let fixture: ComponentFixture<MenuChildControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuChildControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChildControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
