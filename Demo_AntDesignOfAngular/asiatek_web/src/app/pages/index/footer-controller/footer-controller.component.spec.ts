import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterControllerComponent } from './footer-controller.component';

describe('FooterControllerComponent', () => {
  let component: FooterControllerComponent;
  let fixture: ComponentFixture<FooterControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
