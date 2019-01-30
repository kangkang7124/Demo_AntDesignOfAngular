import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var AMap: any;
@Component({
  selector: 'app-rule-list-operation',
  templateUrl: './rule-list-operation.component.html',
  styleUrls: ['./rule-list-operation.component.less']
})
export class RuleListOperationComponent implements OnInit {
  constructor() {}
  @Input() isVisibleAdd: any;
  @Output() modalVisibleStatusChange = new EventEmitter();
  @Input() ruleGroupId: string;

  isOkLoading = false;
  name: string;
  areaType: string;
  isCloseModle = false;
  ngOnInit() {
    this.isVisibleAdd = false;
  }
  areaTypeChange(e) {
    this.isCloseModle = !this.isCloseModle;

  }

  handleOk(): void {
    this.isOkLoading = true;
    this.modalVisibleStatusChange.emit(this.isVisibleAdd);
    window.setTimeout(() => {
      this.isVisibleAdd = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisibleAdd = !this.isVisibleAdd;
    this.modalVisibleStatusChange.emit(this.isVisibleAdd);
  }
}
