import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuControllerComponent } from './menu-controller.component';

describe('MenuControllerComponent', () => {
  let component: MenuControllerComponent;
  let fixture: ComponentFixture<MenuControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
