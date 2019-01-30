import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import 'brace';
import 'brace/ext/language_tools';
import 'ace-builds/src-min-noconflict/snippets/html';
import 'brace/mode/json';
import 'brace/theme/chrome';
declare let ace: any;
@Component({
  selector: 'app-ace-editor',
  templateUrl: './ace-editor.component.html',
  styleUrls: ['./ace-editor.component.less']
})
export class MyAceEditorComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('editor') editor: AceEditorComponent;
  @Input() codeSchema: string;

  @Output() schemaChenge: EventEmitter<any> = new EventEmitter();

  code = '';

  constructor() {}
  onChange(code: any) {}
  /**
   * 当编辑器中的值发生变化后点击 预览/保存 传值给父类
   */
  onChengeCode() {
    this.codeSchema = JSON.parse(this.code);
    this.schemaChenge.emit(this.codeSchema);
  }
  /**
   * 初始化编辑器
   */

  ngAfterViewInit() {
    this.editor.getEditor().setOption({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      useWorker: true
    });
  }

  ngOnInit() {
    const str = JSON.stringify(this.codeSchema, null, 4);
    this.code = str;
  }
  /**
   * 监听父类传入值的变化，发生变化则重新初始化
   */
  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }
}
