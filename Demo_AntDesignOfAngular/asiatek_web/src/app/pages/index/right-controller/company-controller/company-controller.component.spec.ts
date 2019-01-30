import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyControllerComponent } from './company-controller.component';

describe('CompanyControllerComponent', () => {
  let component: CompanyControllerComponent;
  let fixture: ComponentFixture<CompanyControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
