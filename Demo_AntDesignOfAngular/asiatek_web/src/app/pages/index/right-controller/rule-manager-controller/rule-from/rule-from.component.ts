import { Component, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFComponent } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { AreaService } from 'src/app/services/area/area.service';
@Component({
  selector: 'app-rule-from',
  templateUrl: './rule-from.component.html',
  styleUrls: ['./rule-from.component.less']
})
export class RuleFromComponent implements OnInit {
  collapseActive = false;
  @ViewChild('sf') sf: SFComponent;
  formAttribute: any;
  formTitle: any;
  showAddInput = false;

  optionList = [
    { label: '输入框', value: 'string' },
    { label: '选择框', value: 'select' },
    { label: '时间选择', value: 'date' },
    { label: '多选按钮', value: 'checkbox' },
    { label: '时间范围', value: 'dateRange' },
    { label: '区域级联', value: 'cascader' }
  ];
  selectedValue: any;

  schema: SFSchema = {
    type: 'object',
    properties: {}
  };
  areaData: any;
  formData = {};
  ui = {};
  layout = 'horizontal';

  constructor(
    private msg: NzMessageService,
    private http: HttpClient,
    private areaService: AreaService
  ) {}

  submit(value: any) {
    this.msg.success(JSON.stringify(value));
  }

  change(value: any) {
    console.log('formChange', value);
  }

  error(value: any) {
    console.log('formError', value);
  }
  schemaChenged(newSchema: SFSchema) {
    this.schema = newSchema;
    this.sf.reset();
  }
  getAreaData() {
    this.areaService.getAreaDate().subscribe((res: any) => {
      this.areaData = res;
    });
  }
  addschema() {
    const defaultSchema = {
      type: 'string',
      title: this.formTitle
    };
    switch (this.selectedValue) {
      case 'string':
        //  defaultSchema[""] = {};
        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      case 'select':
        defaultSchema['ui'] = {
          widget: 'select'
        };
        defaultSchema['enum'] = [{ label: '请选择', value: '' }];
        defaultSchema['default'] = '';
        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      case 'text':
        defaultSchema['ui'] = {
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 }
        };
        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      case 'date':
        defaultSchema['format'] = 'date-time';
        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      case 'checkbox':
        defaultSchema['enum'] = [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12'
        ];
        defaultSchema['ui'] = {
          widget: 'checkbox',
          span: 3, // 指定每一项 3 个单元的布局
          checkAll: true
        };
        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      case 'dateRange':
        defaultSchema['ui'] = {
          widget: 'date',
          mode: 'range'
        };
        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      case 'cascader':
        defaultSchema.type = 'number';
        defaultSchema['enum'] = this.areaData;
        defaultSchema['default'] = [110000000000, 110100000000, 110105000000];
        defaultSchema['ui'] = {
          widget: 'cascader',
          showSearch: true,
          size: '18em'
        };

        this.resetFrom(this.formAttribute, defaultSchema);
        break;
      default:
        break;
    }
  }

  private resetFrom(
    attributeName: string,
    defaultSchema: { type: string; title: any }
  ) {
    const obj = this.setSchema(attributeName, defaultSchema);
    this.schema = obj;
    this.sf.reset();
  }

  private setSchema(
    attributeName: string,
    defaultSchema: { type: string; title: any }
  ) {
    const obj = JSON.parse(JSON.stringify(this.schema));
    obj.properties[attributeName] = defaultSchema;
    return obj;
  }

  ngOnInit() {
    this.getAreaData();
  }
}
