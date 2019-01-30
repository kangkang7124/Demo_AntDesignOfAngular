import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAceEditorComponent } from './ace-editor.component';

describe('MyAceEditorComponent', () => {
  let component: MyAceEditorComponent;
  let fixture: ComponentFixture<MyAceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
