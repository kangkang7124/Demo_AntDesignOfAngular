import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleFromComponent } from './rule-from.component';
import { DelonFormModule } from '@delon/form';
import { MyAceEditorModule } from '../ace-editor/ace-editor.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ RuleFromComponent ],
  imports: [
    CommonModule,
    FormsModule,
    DelonFormModule,
    MyAceEditorModule,
    NgZorroAntdModule,
    HttpClientModule
  ],
  exports: [CommonModule, RuleFromComponent ]
})
export class RuleFromModule { }
