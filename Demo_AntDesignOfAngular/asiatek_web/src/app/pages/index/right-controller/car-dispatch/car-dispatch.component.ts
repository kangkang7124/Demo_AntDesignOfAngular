import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-car-dispatch',
  templateUrl: './car-dispatch.component.html',
  styleUrls: ['./car-dispatch.component.less']
})
export class CarDispatchComponent implements OnInit {
  selectedFactory1 = ''; // 左边选中的公司id
  selectedFactory2: any; // 右边选中的公司的详情

  leftfactory: any[] = []; // 左边公司
  righfactory: any[] = []; // 右边公司
  list = [];    // 辆自编号-车牌号
  disabled = false;

  move: any = []; // 记录穿梭框从左到右的转移记录

  constructor(public http: HttpClient, public msg: NzMessageService) { }

  ngOnInit() {
    const api = '/cdms/company/getAllFactory';
    this.http.get(api).subscribe(
      (response: any[]) => {
        this.leftfactory = response;
        this.righfactory = response;
        console.log(response);
      }
    );
  }
  /*页面左边选中的工地*/
  factory1(event) {
    let ret = [];
    const temp = [];
    const api = '/cdms/dispatch/getSelfNum?id=' + event;
    this.http.get(api).subscribe(
      (response: any) => {
        console.log(response);
        ret = response.data;
        for (let i = 0; i < ret.length; i++) {
          temp.push({
            key        : ret[i].id,
            title      : ret[i].num,
            description: ret[i].vehicleId,
            direction  : 'left'
          });
        }
        this.list = temp;
      });
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  /*记录所有从左到右的移动动作，并赋值给move*/
  change(ret: {from, to, list}): void {
    let temp = [];
      if (ret.from === 'left') {
      temp = ret.list;
      for (let i = 0; i < temp.length; i++) {
        this.move.push({
          id           : temp[i].key,
          selfnum      : temp[i].title,
          description  : temp[i].description,
          direction    : 'right'
        });
      }
    }
    console.log(this.move);
  }

  save() {

    console.log(this.list);
    let message = '';
    console.log(this.selectedFactory2);
    if (typeof this.selectedFactory2 === 'undefined') {
      alert('请选择要调遣到的公司。');
      return;
    }
    if (0 === this.move.length) {
      alert('请将调遣的车辆移动到右框。');
      return;
    }

    for (let i = 0; i < this.move.length; i++) {
      message = message + this.move[i].selfnum + '-' + this.move[i].description + ' ';
    }

    let self_nums = [];
    if (confirm('是否要将 "' + message + '" 调遣到' + this.selectedFactory2.name)) {
      for (let i = 0; i < this.move.length; i++) {
        self_nums.push({
          id : this.move[i].id,
          companyId: this.selectedFactory2.id
        });
      }
      const api = '/cdms/dispatch/startDispatch';
      this.http.post(api, self_nums).subscribe();

    }

    // this.msg.success(`your clicked ${direction}!`);
  }
}
