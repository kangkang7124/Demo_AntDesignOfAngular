import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AceEditorModule } from 'ng2-ace-editor';
import { MyAceEditorComponent } from './ace-editor.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  declarations: [MyAceEditorComponent],
  imports: [
    CommonModule,
    AceEditorModule,
    NgZorroAntdModule
  ],
  exports: [CommonModule, MyAceEditorComponent]
})
export class MyAceEditorModule {}
