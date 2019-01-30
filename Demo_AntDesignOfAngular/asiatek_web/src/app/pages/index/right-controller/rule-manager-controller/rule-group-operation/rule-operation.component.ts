import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd';
import { RuleService } from 'src/app/services/rule/rule.service';
import { RuleGroup } from '../../../../../interfaces/ruleGroup';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rule-operation',
  templateUrl: './rule-operation.component.html',
  styleUrls: ['./rule-operation.component.less']
})
export class RuleAddComponent implements OnInit {
  constructor(
    private notification: NzNotificationService,
    private ruleService: RuleService,
    private msg: NzMessageService,
    private router: Router,
    private _iconService: NzIconService
  ) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1020109_68xk3368ah8.js'
    });
  }
  @Input() addModalVisible: any;
  @Output() modalVisibleStatusChange = new EventEmitter();
  @Input() myOptionName: any;
  @Input() modifyRuleGroup: RuleGroup;

  contentTemplate = true;
  isConfirmLoading = false;

  collapseActive = false;
  modalClassSwitch = false;

  icons = [
    { name: '关键点路线', icon: 'icon-luxianguanjiandianyujing' },
    { name: '夜间行车查看', icon: 'icon-yejianhangchechakan' },
    { name: '路线偏移', icon: 'icon-luxianpianyi' },
    { name: '超速1', icon: 'icon-chaosu1' },
    { name: '超速2', icon: 'icon-chaosu' },
    { name: '疲劳驾驶', icon: 'icon-fatigue-driving' },
    { name: '异常定位', icon: 'icon-yichangdingwei' },
    { name: '限速区', icon: 'icon-xiansuqu' },
    { name: '超时停留', icon: 'icon-chaoshitingliu' },
    { name: '拍照', icon: 'icon-zhaopianpaizhao' },
    { name: '报警联动', icon: 'icon-baojingliandong' },
    { name: '录像', icon: 'icon-shexiang' },
    { name: '车', icon: 'icon-car1' },
    { name: 'wifi', icon: 'icon-wifixiazaitupian' },
    { name: '限速', icon: 'icon-xiansu' },
    { name: '车2', icon: 'icon-car' }
  ];
  /**
   * 添加/修改 规则组
   */
  handleOk(): void {
    this.isConfirmLoading = true;
    if (
      this.modifyRuleGroup.id !== undefined &&
      this.modifyRuleGroup.id != null
    ) {
      // 修改
      this.ruleService
        .updateRuleGroup(this.modifyRuleGroup)
        .subscribe((res: any) => {
          this.addModalVisible = false;
          this.modalVisibleStatusChange.emit(this.addModalVisible);
          this.isConfirmLoading = false;
          this.message(res);
        });
    } else {
      // 新增
      this.ruleService
        .addRuleGroup(this.modifyRuleGroup)
        .subscribe((res: any) => {
          this.addModalVisible = false;
          this.modalVisibleStatusChange.emit(this.addModalVisible);
          this.isConfirmLoading = false;
          this.message(res);
        });
    }
  }
  /**
   * 返回消息处理
   */
  private message(res: any) {
    if (res.code === 0) {
      this.notification.create('success', '提示', res.message);
    } else {
      this.notification.create('error', '提示', res.message);
    }
  }

  handleCancel(): void {
    this.addModalVisible = false;
    this.modalVisibleStatusChange.emit(this.addModalVisible);
  }
  chengeModelCless() {
    this.modalClassSwitch = !this.modalClassSwitch;
  }

  ngOnInit() {
    if (this.modifyRuleGroup === undefined) {
      this.modifyRuleGroup = {
        description: '',
        icon: '',
        name: '',
        id: ''
      };
    }
  }
}
