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
import {IccidService} from '../../../../services/iccid/iccid.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SimManufacturerService} from '../../../../services/simManufacturer/simManufacturer.service';

@Component({
  selector: 'app-iccid-controller',
  templateUrl: './iccid-controller.component.html',
  styleUrls: ['./iccid-controller.component.less']
})

export class IccidControllerComponent implements OnInit {
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
  searchValue = {'dateRange': [startOfDay(new Date()), endOfDay(new Date())], 'iccid': '', 'sim': '', 'manufacturerId': '0', 'pageNum': 1, 'pageSize': 10};
  loading = true;
  total = 0;
  dataSet = [];
  allChecked = false;
  ids = [];
  editVisible = false;
  validateForm: FormGroup;
  handleType = '';
  isOkDisabled = false;
  isOkLoading = false;
  simReg = /^[0-9]*$/;
  iccidReg = /^[A-Za-z0-9]+$/;
  validateDisabled = false;
  simManufacturer = {};

  changeChecked(value: boolean, id: string): void {
    value ? this.ids.push(id) : this.ids.splice(this.ids.indexOf(id), 1);
    if (!value && this.allChecked) this.allChecked = false;
    if (value && this.ids.length == this.dataSet.length) this.allChecked = true;
  }

  checkAll(value: boolean): void {
    this.ids = [];
    this.allChecked = value;
    this.dataSet.forEach(item => (item.checked = value, value ? this.ids.push(item.id) : false));
  }

  private loadData() {
    console.log(this.searchValue);
    this.loading = true;
    this.isOkDisabled = true;
    this.iccidService.search(this.searchValue).subscribe((response: any) => {
      console.log(response);
      if (response.state) {
        let total = response.data.total;
        if (total > 0) {
          if (response.data.hasOwnProperty('list')) {
            let data = response.data.list;
            data.forEach(item => (item.checked = false));
            this.dataSet = [...data];
          } else {
            this.searchValue.pageNum = total%this.searchValue.pageSize == 0 ? total/this.searchValue.pageSize : total/this.searchValue.pageSize > 1 ? total/this.searchValue.pageSize : 1;
            this.loadData();
          }
        } else {
          this.dataSet = [];
        }
        this.total = total;
        this.ids = [];
        this.allChecked = false;
      } else {
        alert(response.message);
      }
      this.loading = false;
      this.isOkDisabled = false;
    }, e => {
      console.log(e);
      alert('连接异常，请稍后再试');
      this.loading = false;
    });
  }

  search(): void {
    this.searchValue.pageNum = 1;
    this.loadData();
  }

  pageIndexChange(pageNum:number): void {
    this.searchValue.pageNum = pageNum;
    this.loadData();
  }

  showEditModel(data): void {
    this.validateForm.reset();
    this.validateForm.get('id').setValue(data.id);
    this.validateForm.get('iccid').setValue(data.iccid);
    this.validateForm.get('sim').setValue(data.sim);
    this.validateForm.get('simManufacturer').setValue( String(data.manufacturerId));
    this.validateDisabled = true;
    this.handleType = 'edit';
    this.editVisible = true;
  }

  delete(): void {
    if(this.ids.length == 0){
      alert('请至少选择一项');
      return;
    }
    this.loading = true;
    this.isOkDisabled = true;
    this.iccidService.delete(this.ids).subscribe((response: any) => {
      if (response.state) {
        this.loadData();
      }
      this.loading = false;
      this.isOkDisabled = false;
    }, e => {
      console.log(e);
      alert('连接异常，请稍后再试');
      this.loading = false;
    });
  }

  showAddModel(): void {

  }

  handleCancel(): void {
    if (this.handleType == 'edit') {
      this.editVisible = false;
    }
  }

  handleOk(): void {
    this.isOkDisabled = true;
    this.isOkLoading = true;
    let controls = this.validateForm.controls;
    this.iccidService.save(this.handleType, {'id': controls.id.value, 'iccid': controls.iccid.value, 'sim': controls.sim.value, 'manufacturerId': controls.simManufacturer.value}).subscribe((response: any) => {
      if (response.state) {
        alert(this.handleType + '成功');
        this.editVisible = false;
        this.loadData();
      } else {
        alert(response.message);
      }
      this.isOkDisabled = false;
      this.isOkLoading = false;
    }, e => {
      console.log(e);
      alert('连接异常，请稍后再试');
      this.isOkDisabled = false;
      this.isOkLoading = false;
    });
  }

  getKeys(item): string[] {
    return Object.keys(item);
  }

  simValidator = (control: FormControl): { [ s: string ]: boolean } => { return this.validator(control, 'sim'); };

  iccidValidator = (control: FormControl): { [ s: string ]: boolean } => { return this.validator(control, 'iccid'); };

  private validator(control: FormControl, key: string): { [ s: string ]: boolean } {
    let result: {[ s: string ]: boolean} = {};
    if (!control.value) {
      result.required = true;
    } else {
      let condition: {'reg': RegExp, 'len': number} = {'reg': this.simReg, 'len': 13};
      if (key == 'iccid') condition = {'reg': this.iccidReg, 'len': 20};
      if (!condition.reg.test(control.value) || control.value.length != condition.len) {
        this.validateDisabled = true;
        result[key] = true;
        result.error = true;
      }
    }
    this.getKeys(result).length == 0 ? this.validateDisabled = false : this.validateDisabled = true;
    return result;
  }

  constructor(private iccidService: IccidService, private fb: FormBuilder, private simManufacturerService: SimManufacturerService) {
    this.validateForm = this.fb.group({
      id              : [],
      iccid           : ['', [ this.iccidValidator ] ],
      sim             : ['', [ this.simValidator ] ],
      simManufacturer : []
    });
  }

  ngOnInit() {
    this.isOkDisabled = true;
    this.loading = true;
    this.simManufacturerService.getAll().subscribe((response: any) => {
      if(response.state){
        response.data.forEach(item => (this.simManufacturer[item.id] = item.name));
        console.log(this.simManufacturer);
        this.loadData();
      } else {
        alert(response.message);
      }
      this.isOkDisabled = false;
    }, e => {
      console.log(e);
      alert('连接异常，请稍后再试');
      this.loading = false;
    });
  }

}
