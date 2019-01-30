import { Component, OnInit } from '@angular/core';
import { TerminalService } from 'src/app/services/terminal/terminal.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-terminal-set',
  templateUrl: './terminal-set.component.html',
  styleUrls: ['./terminal-set.component.less'],
  providers: [TerminalService]
})

export class TerminalSetComponent implements OnInit {
  isSpinning = true;
  textStyle = {display: 'block', height: '30px', lineHeight: '30px'};
  showStyle = {display: 'inline-block'};
  hideStyle = {display: 'none'};
  searchValue = '';
  searchDisabled = true;
  freshDisabled = true;
  data = [
    {'companyName': '测试单位1有限公司', 'licencePlate': '京A00001', 'terminalId': '0KGJLOP', 'vehicleVin' : '1111111111111111'},
    {'companyName': '测试单位2有限公司', 'licencePlate': '京A00002', 'terminalId': 'JEE1835', 'vehicleVin' : '1111111111111111'},
    {'companyName': '测试单位3有限公司', 'licencePlate': '京A00003', 'terminalId': '3069882', 'vehicleVin' : '1111111111111111'}
  ];
  displayData = [];
  isVisible = false;
  textVisible = false;
  attributesVisible = false;
  modelData = {'companyName': '', 'licencePlate': '', 'terminalId': ''};
  title = '终端参数查询';
  submitText = '查询';
  ids = [];
  handleType = '0';
  paramList = [
      {'name': 'heartbeatInterval', 'id': '00000001', 'label': '终端心跳发送间隔(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'primaryServerIP', 'id': '00000013', 'label': '主服务器IP地址或域名', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'str'},
      {'name': 'backupServerIP', 'id': '00000017', 'label': '备份服务器IP地址或域名', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'str'},
      {'name': 'port', 'id': '00000018', 'label': '服务器TCP端口', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'dormancyReportInterval', 'id': '00000027', 'label': '休眠时汇报时间间隔(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'urgencyReportInterval', 'id': '00000028', 'label': '紧急报警时汇报时间间隔(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'defaultReportInterval', 'id': '00000029', 'label': '缺省时间汇报间隔(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'maxSpeed', 'id': '00000055', 'label': '最高速度(km/h)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'overSpeedDuration', 'id': '00000056', 'label': '超速持续时间(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'continuousDrivingTimeLimit', 'id': '00000057', 'label': '连续驾驶时间门限(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'cumulativeDrivingTimeLimit', 'id': '00000058', 'label': '当天累计驾驶时间门限(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'minRestTime', 'id': '00000059', 'label': '最小休息时间(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'maxStoppingTime', 'id': '0000005A', 'label': '最长停车时间(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'overSpeedAlarmValue', 'id': '0000005B', 'label': '超速报警预警差值(km/h)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'decimal'},
      {'name': 'fatigueDrivingAlarmValue', 'id': '0000005B', 'label': '疲劳驾驶预警差值(s)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'num'},
      {'name': 'mileage', 'id': '00000080', 'label': '车辆里程表读数(km)', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'decimal'},
      {'name': 'licensePlate', 'id': '00000083', 'label': '机动车号牌', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'str'},
      {'name': 'color', 'id': '00000084', 'label': '车牌颜色', 'checked': false,
        'checkDisabled': false, 'inputDisabled': false, 'value': '', 'type': 'select'}
  ];
  colorData = [
      {'value': '', 'label': '请选择'},
      {'value': '1', 'label': '蓝色'},
      {'value': '2', 'label': '黄色'},
      {'value': '3', 'label': '黑色'},
      {'value': '4', 'label': '白色'},
      {'value': '5', 'label': '绿色'},
      {'value': '6', 'label': '黄绿'},
      {'value': '8', 'label': '农黄'},
      {'value': '9', 'label': '其他'}
  ];
  textData = {'type': '1', 'text': ''};
  textType = [
    {'value': '1', 'text': '紧急'},
    {'value': '4', 'text': '终端显示器显示'},
    {'value': '8', 'text': '终端TTS播读'},
    {'value': '16', 'text': '广告屏显示'},
  ];
  attributesData = [
    {'name': 'terminalCategory', 'text': '终端类型', 'value': ''},
    {'name': 'manufacturerId', 'text': '制造商ID', 'value': ''},
    {'name': 'terminalType', 'text': '终端型号', 'value': ''},
    {'name': 'equipmentId', 'text': '终端ID', 'value': ''},
    {'name': 'ICCID', 'text': 'ICCID', 'value': ''},
    {'name': 'hardwareVersion', 'text': '硬件版本号', 'value': ''},
    {'name': 'firmwareVersion', 'text': '固件版本号', 'value': ''},
    {'name': 'GNSSAttributes', 'text': 'GNSS模块属性', 'value': ''},
    {'name': 'GPRSAttributes', 'text': '通信模块属性', 'value': ''}
  ];
  isOkLoading = false;
  isOkDisabled = false;
  total = 0;
  parserNumber = value => value.indexOf('.') === -1 ? value : value.slice(0, value.indexOf('.'));
  search(): void {
    if (this.searchValue == null || this.searchValue.trim().length === 0) {
      this.displayData = [ ...this.data ];
    } else {
      const filterFunc = (item) => {
        const bS = item.companyName.indexOf(this.searchValue) !== -1;
        const bL = item.licencePlate.indexOf(this.searchValue) !== -1;
        const bV = item.vehicleVin.indexOf(this.searchValue) !== -1;
        const bT = item.terminalId.indexOf(this.searchValue) !== -1;
        return bS || bL || bV || bT;
      };
      const data = this.data.filter(item => filterFunc(item));
      this.displayData = [ ...data ];
    }
  }
  fresh(): void {
    this.isSpinning = true;
    this.displayData = [];
    this.searchDisabled = true;
    this.freshDisabled = true;
    this.terminalService.getTerminalList().subscribe((response: any) => {
      console.log(response);
      if (response.state) {
        this.data = response.data;
        this.displayData = [...this.data];
        this.total = this.displayData.length;
        this.freshDisabled = false;
        this.searchDisabled = false;
        this.isSpinning = false;
      }
    });
  }
  showParamQueryModel(data): void {
    this.handleType = '1';
    this.title = '终端参数查询';
    this.modelData = data;
    this.paramList.forEach(item => (item.checked = false, item.checkDisabled = false, item.inputDisabled = true, item.value = ''));
    this.submitText = '查询参数';
    this.showStyle.display = 'inline-block';
    this.hideStyle.display = 'none';
    this.isVisible = true;
  }
  showParamSetModel(data): void {
    this.handleType = '2';
    this.title = '终端参数设置';
    this.modelData = data;
    this.paramList.forEach(item => (item.checked = false, item.checkDisabled = true, item.inputDisabled = false, item.value = ''));
    this.submitText = '下发设置';
    this.showStyle.display = 'none';
    this.hideStyle.display = 'inline-block';
    this.isVisible = true;
  }
  showSendTextModel(data): void {
    this.handleType = '3';
    this.title = '下发文本消息';
    this.modelData = data;
    this.submitText = '下发文本';
    this.textVisible = true;
  }
  showAttributesQueryModel(data): void {
    this.handleType = '4';
    this.title = '查询终端属性';
    this.modelData = data;
    this.submitText = '查询属性';
    this.attributesVisible = true;
  }
  private paramQuery() {
    if (this.ids.length === 0) {
      alert('请至少选择一个查询项');
      return;
    }
    this.isOkLoading = true;
    this.isOkDisabled = true;
    console.log(this.ids);
    this.terminalService.paramQuery(this.ids, this.modelData.terminalId, this.modelData.companyName,
      this.modelData.licencePlate).subscribe((response: any) => {
      console.log(response);
      if (response.state) {
        const showData = {};
        const responseData = JSON.parse(response.data);
        for ( let i = 0; i < responseData.length; i++) {
          showData[responseData[i].paramId] = responseData[i].paramValue;
        }
        this.paramList.forEach(item => (showData.hasOwnProperty(item.id) ? item.value = String(showData[item.id]) : false));
      } else {
        this.modalService.info({
          nzTitle: '操作失败',
          nzContent: '<p>' + response.message + '</p>'
        });
      }
      this.isOkLoading = false;
      this.isOkDisabled = false;
    });
  }
  private paramSet() {
    const param = {};
    this.paramList.forEach(item => (item.value !== '' ? param[item.name] = item.value : false));
    if (JSON.stringify(param) === '{}') {
      alert('没有要下发的参数');
      return;
    }
    this.isOkLoading = true;
    this.isOkDisabled = true;
    console.log(param);
    this.terminalService.paramSet(param, this.modelData.terminalId, this.modelData.companyName,
      this.modelData.licencePlate).subscribe((response: any) => {
      console.log(response);
      this.modalService.info({
        nzTitle: response.state ? '操作成功' : '操作失败',
        nzContent: '<p>' + response.message + '</p>'
      });
      this.isOkLoading = false;
      this.isOkDisabled = false;
    });
  }
  private sendText() {
    const text = this.textData.text.trim();
    if (text.length === 0) {
      alert('请输入下发文本内容');
      return;
    }
    this.isOkLoading = true;
    this.isOkDisabled = true;
    this.terminalService.sendText(this.textData.type, text, this.modelData.terminalId, this.modelData.companyName,
      this.modelData.licencePlate).subscribe((response: any) => {
      console.log(response);
      this.modalService.info({
        nzTitle: response.state ? '操作成功' : '操作失败',
        nzContent: '<p>' + response.message + '</p>'
      });
      this.isOkLoading = false;
      this.isOkDisabled = false;
    });
  }
  private attributesQuery() {
    this.isOkLoading = true;
    this.isOkDisabled = true;
    this.terminalService.attributesQuery(this.modelData.terminalId, this.modelData.companyName, this.modelData.licencePlate)
      .subscribe((response: any) => {
        console.log(response);
        if (response.state) {
          const showData = {};
          const responseData = JSON.parse(response.data);
          for ( let i = 0; i < responseData.length; i++) {
            showData[responseData[i].paramId] = responseData[i].paramValue;
          }
          this.attributesData.forEach(item => (showData.hasOwnProperty(item.name) ? item.value = String(showData[item.name]) : false));
        } else {
          this.modalService.info({
            nzTitle: '操作失败',
            nzContent: '<p>' + response.message + '</p>'
          });
        }
        this.isOkLoading = false;
        this.isOkDisabled = false;
    });
  }
  handleOk(handleType): void {
    if (handleType === '1') {
      this.paramQuery();
    } else if (handleType === '2') {
      this.paramSet();
    } else if (handleType === '3') {
      this.sendText();
    } else if (handleType === '4') {
      this.attributesQuery();
    }
  }
  handleCancel(handleType): void {
    if (handleType === '1' || handleType === '2') {
      this.isVisible = false;
    } else if (handleType === '3') {
      this.textVisible = false;
    } else if (handleType === '4') {
      this.attributesVisible = false;
    }
  }
  getIds(value: string[]): void {
    this.ids = value;
  }
  fullSelected(): void {
    this.ids = [];
    this.paramList.forEach(item => (item.checked = true, this.ids.push(item.id)));
  }
  noneSelected(): void {
    this.ids = [];
    this.paramList.forEach(item => (item.checked = false));
  }
  clearAll(): void {
    this.paramList.forEach(item => (item.value = ''));
  }
  constructor(private terminalService: TerminalService, private modalService: NzModalService) { }
  ngOnInit() {
    this.terminalService.getTerminalList().subscribe((response: any) => {
      console.log(response);
      if (response.state) {
        this.data = response.data;
        this.displayData = [...this.data];
        this.total = this.displayData.length;
        this.freshDisabled = false;
        this.searchDisabled = false;
        this.isSpinning = false;
      }
    });
  }
}
