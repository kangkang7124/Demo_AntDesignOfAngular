import { Component, OnInit } from '@angular/core';
import * as endOfMonth from 'date-fns/end_of_month';
import * as startOfMonth from 'date-fns/start_of_month';
import * as startOfDay from 'date-fns/start_of_day';
import * as endOfDay from 'date-fns/end_of_day';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as startOfYesterday from 'date-fns/start_of_yesterday';
import * as endOfYesterday from 'date-fns/end_of_yesterday';
import * as addMonths from 'date-fns/add_months';
import * as addYears from 'date-fns/add_years';
import * as addWeeks from 'date-fns/add_weeks';
import * as startOfYear from 'date-fns/start_of_year';
import * as endOfYear from 'date-fns/end_of_year';
import {TerminalService} from 'src/app/services/terminal/terminal.service';

@Component({
  selector: 'app-set-log',
  templateUrl: './set-log.component.html',
  styleUrls: ['./set-log.component.less'],
  providers: [TerminalService]
})
export class SetLogComponent implements OnInit {
  dateRange = [startOfDay(new Date()), endOfDay(new Date())];
  ranges = {
    '去年': [ startOfYear(addYears(new Date(), -1)), endOfYear(addYears(new Date(), -1))],
    '上月': [ startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    '上周': [ startOfWeek(addWeeks(new Date(), -1)), endOfWeek(addWeeks(new Date(), -1))],
    '昨天': [ startOfYesterday(), endOfYesterday()],
    '今天': [ startOfDay(new Date()), endOfDay(new Date())],
    '本周': [ startOfWeek(new Date()), endOfDay(new Date())],
    '本月': [ startOfMonth(new Date()), endOfDay(new Date())],
    '今年': [ startOfYear(new Date()), endOfDay(new Date())]
  };
  handleType = '0';
  selectData = [{'label': '全部', 'value': '0'}, {'label': '终端参数查询', 'value': '1'}, {'label': '终端参数设置', 'value': '2'},
    {'label': '下发文本信息', 'value': '3'}, {'label': '查询终端属性', 'value': '4'}];
  displayData = [];
  data = [];
  searchValue = '';
  queryDisabled = false;
  searchDisabled = true;
  isSpinning = false;
  detailData = [];
  detailVisible = false;
  params = {
    '00000001': '终端心跳发送间隔', '00000013': '主服务器IP地址或域名', '00000017': '备份服务器IP地址或域名',
    '00000018': '服务器TCP端口', '00000027': '休眠时汇报时间间隔', '00000028': '紧急报警时汇报时间间隔',
    '00000029': '缺省时间汇报间隔', '00000055': '最高速度', '00000056': '超速持续时间',
    '00000057': '连续驾驶时间门限', '00000058': '当天累计驾驶时间门限', '00000059': '最小休息时间',
    '0000005A': '最长停车时间', '0000005B': '超速报警预警差值', '0000005C': '疲劳驾驶预警差值',
    '00000080': '车辆里程表读数', '00000083': '机动车号牌', '00000084': '车牌颜色'
  };
  params1 =  {
    'heartbeatInterval': '终端心跳发送间隔', 'primaryServerIP': '主服务器IP地址或域名', 'backupServerIP': '备份服务器IP地址或域名',
    'port': '服务器TCP端口', 'dormancyReportInterval': '休眠时汇报时间间隔', 'urgencyReportInterval': '紧急报警时汇报时间间隔',
    'defaultReportInterval': '缺省时间汇报间隔', 'maxSpeed': '最高速度', 'overSpeedDuration': '超速持续时间',
    'continuousDrivingTimeLimit': '连续驾驶时间门限', 'cumulativeDrivingTimeLimit': '当天累计驾驶时间门限', 'minRestTime': '最小休息时间',
    'maxStoppingTime': '最长停车时间', 'overSpeedAlarmValue': '超速报警预警差值', 'fatigueDrivingAlarmValue': '疲劳驾驶预警差值',
    'mileage': '车辆里程表读数', 'licensePlate': '机动车号牌', 'color': '车牌颜色'
  };
  params2 = {
    'terminalCategory': '终端类型', 'manufacturerId': '制造商ID', 'terminalType': '终端型号', 'equipmentId': '终端ID',
    'ICCID': 'ICCID', 'hardwareVersion': '硬件版本号', 'firmwareVersion': '固件版本号', 'GNSSAttributes': 'GNSS模块属性',
    'GPRSAttributes': '通信模块属性'
  };
  color = {'1': '蓝色', '2': '黄色', '3': '黑色', '4': '白色', '5': '绿色', '6': '黄绿', '8': '农黄', '9': '其他'};
  total = 0;
  query(): void {
    this.displayData = [];
    this.total = 0;
    this.searchDisabled = true;
    this.queryDisabled = true;
    this.isSpinning = true;
    console.log(this.dateRange[0], this.dateRange[1], this.handleType);
    this.terminalService.query(this.dateRange[0].getTime(), this.dateRange[1].getTime(), this.handleType).subscribe((response: any) => {
      console.log(response);
      this.data = response;
      this.displayData = [...this.data];
      this.total = this.displayData.length;
      this.isSpinning = false;
      this.queryDisabled = false;
      if (this.displayData.length > 0) {
        this.searchDisabled = false;
      }
    });
  }
  detail(data): void {
    this.detailData = [];
    if (data.handleType === '1') {
      this.createParamQueryDetail(data);
    } else if (data.handleType === '2') {
      this.createParamSetDetail(data);
    } else if (data.handleType === '3') {
      this.createSendTextDetail(data);
    } else {
      this.createAttributesQueryDetail(data);
    }
    this.detailVisible = true;
    console.log(this.detailData);
  }
  private createAttributesQueryDetail(data: any) {
    let name1 = '终端返回信息：';
    let data1 = '';
    if (data.handleResult == null || data.handleResult === '') {
      data1 = '没有查询到回复或者在查询到回复前页面断开连接';
    } else {
      if (data.success === '0') {
        const result = JSON.parse(data.handleResult);
        for ( let i = 0; i < result.length; i++) {
          const paramId = result[i].paramId;
          const paramValue = result[i].paramValue;
          if (i === 0) {
            data1 = this.params2[paramId] + '=' + paramValue;
          } else {
            data1 = data1 + '，' + this.params2[paramId] + '=' + paramValue;
          }
        }
      } else {
        name1 = '下发失败原因：';
        data1 = data.handleResult;
      }
    }
    this.detailData.push({'name': name1, 'data': data1});
  }
  private createSendTextDetail(data: any) {
    const name1 = '文本信息类型：';
    const name2 = '文本信息内容：';
    const name3 = '终端返回信息：';
    const d = data.handleData;
    const index = d.indexOf('#');
    let data1 = d.substring(0, index);
    data1 = data1 === '1' ? '紧急' : data1 === '4' ? '终端显示器显示' : data1 === '8' ? '终端TTS播读' : data1 === '16' ? '广告屏显示' : '未知';
    let data2 = d.substring(index + 1, data.length);
    let data3 = '';
    if (data.handleResult == null || data.handleResult === '') {
      data2 = '没有查询到回复或者在查询到回复前页面断开连接';
    } else {
      if (data.success === '0') {
        data3 = data.handleResult === '00' ? '成功' : data.handleResult === '01' ? '失败' : data.handleResult === '02' ?
          '消息有误' : data.handleResult === '03' ? '不支持' : '未知';
      } else {
        data3 = data.handleResult;
      }
    }
    this.detailData.push({'name': name1, 'data': data1});
    this.detailData.push({'name': name2, 'data': data2});
    this.detailData.push({'name': name3, 'data': data3});
  }
  private createParamSetDetail(data: any) {
    const name1 = '设置参数项目';
    const name2 = '终端返回信息';
    const d = JSON.parse(data.handleData);
    let data1 = '';
    for (const item in d) {
      if (d.hasOwnProperty(item)) {
        let value = d[item];
        if (value === '' || item === 'terminalId' || item === 'terminalPhone') {
          continue;
        } else {
          const p = this.params1[item];
          if (item === 'color') {
            value = this.color[value];
          }
          data1 = data1 + p + '=' + value + ',';
        }
      }
    }
    data1 = data1.substring(0, data1.length - 1);
    this.detailData.push({'name': name1, 'data': data1});
    let data2 = '';
    if (data.handleResult == null || data.handleResult.length === 0) {
      data2 = '没有查询到回复或者在查询到回复前页面断开连接';
    } else {
      if (data.success === '0') {
        data2 = data.handleResult === '00' ? '成功' : data.handleResult === '01' ? '失败' : data.handleResult === '02'
          ? '消息有误' : data.handleResult === '03' ? '不支持' : '未知';
      } else {
        data2 = data.handleResult;
      }
    }
    this.detailData.push({'name': name2, 'data': data2});
  }
  private createParamQueryDetail(data: any) {
    const name1 = '查询参数项目';
    let name2 = '终端返回信息';
    const d = JSON.parse(data.handleData);
    let data1 = '';
    for ( let i = 0; i < d.length; i++) {
      if (i === 0) {
        data1 = this.params[d[i]];
      } else {
        data1 = data1 + '，' + this.params[d[i]];
      }
    }
    this.detailData.push({'name': name1, 'data': data1});
    let data2 = '';
    if (data.handleResult == null || data.handleResult.length === 0) {
      data2 = '没有查询到回复或者在查询到回复前页面断开连接';
    } else {
      if (data.success === '0') {
        const result = JSON.parse(data.handleResult);
        for ( let i = 0; i < result.length; i++) {
          const paramId = result[i].paramId;
          let paramValue = result[i].paramValue;
          if (paramId === '00000084') {
            paramValue = this.color[paramValue];
          }
          if (i === 0) {
            data2 = this.params[paramId] + '=' + paramValue;
          } else {
            data2 = data2 + '，' + this.params[paramId] + '=' + paramValue;
          }
        }
      } else {
        name2 = '下发失败原因：';
        data2 = data.handleResult;
      }
    }
    this.detailData.push({'name': name2, 'data': data2});
  }
  search(): void {
    if (this.searchValue == null || this.searchValue.trim().length === 0) {
      this.displayData = [ ...this.data ];
    } else {
      const filterFunc = (item) => {
        const bS = item.companyName.indexOf(this.searchValue) !== -1;
        const bL = item.licencePlate.indexOf(this.searchValue) !== -1;
        const bT = item.terminalId.indexOf(this.searchValue) !== -1;
        const bN = item.name.indexOf(this.searchValue) !== -1;
        return bS || bL || bT || bN;
      };
      const data = this.data.filter(item => filterFunc(item));
      this.displayData = [ ...data ];
    }
  }
  handleCancel(): void {
    this.detailVisible = false;
  }
  constructor(private terminalService: TerminalService) { }
  ngOnInit() {
  }
}
