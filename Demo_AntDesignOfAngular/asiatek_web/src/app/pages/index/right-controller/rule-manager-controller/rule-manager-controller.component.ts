import { Component, OnInit } from '@angular/core';
import { RuleService } from 'src/app/services/rule/rule.service';
import { NzIconService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { RuleGroup } from 'src/app/interfaces/ruleGroup';

@Component({
  selector: 'app-rule-manager-controller',
  templateUrl: './rule-manager-controller.component.html',
  styleUrls: ['./rule-manager-controller.component.less'],
  providers: [RuleService]
})
export class RuleManagerControllerComponent implements OnInit {
  isVisible = false;
  constructor(
    private ruleService: RuleService,
    private msg: NzNotificationService,
    private modalService: NzModalService,
    private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1020109_68xk3368ah8.js'
    });
  }
  optionName = '';
  ruleGroup: RuleGroup;
  modifyRuleGroup: RuleGroup;
  rules: RuleGroup[];
  getAllRules() {
    this.ruleService.getRuleGroupList().subscribe((res: any) => {
      this.rules = res.data;
    });
  }

  addRule() {
    this.isVisible = !this.isVisible;
    this.modifyRuleGroup = {
      description: '',
      icon: '',
      name: '',
      id: '',
    };
    this.optionName = '添加';
  }

  modifyRule(ruleGroup: RuleGroup) {
    this.modifyRuleGroup = ruleGroup;
    this.optionName = '修改';
    this.isVisible = !this.isVisible;
  }


  delete(ruleGroup: RuleGroup) {
    this.modalService.warning({
      nzTitle: '警告',
      nzContent: '确认要删除此类型组吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.rules = this.rules.filter(rule => rule !== ruleGroup);
        this.ruleService.delRuleGroup(ruleGroup).subscribe((res: any) => {
          this.message(res);
        });
      }
    });
  }


  private message(res: any) {
    if (res.code === 0) {
      this.msg.create('success', '提示', res.message);
    } else {
      this.msg.create('error', '提示', res.message);
    }
  }

  ngOnInit(): void {

    this.getAllRules();

  }

}
