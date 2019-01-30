import {HttpClient} from '@angular/common/http';
import { InsuranceGroup } from 'src/app/interfaces/insuranceGroup';
import { Component, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import {NzNotificationService} from 'ng-zorro-antd';
@Component({
  selector: 'app-insurance-controller',
  templateUrl: './insurance-controller.component.html',
  styleUrls: ['./insurance-controller.component.less']
})
export class InsuranceControllerComponent implements OnInit {

  select;
  insurance: InsuranceGroup[];
  displayData: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  dataSet = [];
  title = '';
  isVisible = false;
  visible = false;
  searchValue = '';
  insPerson = '';
  insuranceMessage: InsuranceGroup = {
    id : '',
    name : '',
    insPerson : '',
    insDate : new Date(),
    target : '',
    endDate : new Date(),
    remarks : ''
  };
  insuranceGroup: InsuranceGroup = {
    id : '',
    name : '',
    insPerson : '',
    insDate : new Date(),
    target : '',
    endDate : new Date(),
    remarks : ''
  };

  constructor(public http: HttpClient,
              private msg: NzNotificationService,
              private insuranceService: InsuranceService) { }
              currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean }>): void {
    this.displayData = $event;
  }

  /*关闭模态窗口*/
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleCancel1(): void {
    console.log('Button cancel clicked!');
    this.visible = false;
  }

  set(data) {
    this.title = '修改保险';
    this.insuranceMessage.id = data.id;
    this.insuranceMessage.name = data.name;
    this.insuranceMessage.insPerson  = data.name;
    this.insuranceMessage.insDate = new Date(data.insDate);
    this.insuranceMessage.target = data.target;
    this.insuranceMessage.endDate =  new Date(data.endDate);
    this.insuranceMessage.remarks = data.remarks;
    this.isVisible = true;
  }

  setInsurance() {
    this.insuranceService.updateInsurance(this.insuranceMessage).subscribe((res: any) => {
      this.message(res);
      this.getAllInsurance();
    });
    this.isVisible = false;
  }

  add() {
    this.title = '新增保险';
    this.insuranceGroup.id = '';
    this.insuranceGroup.name = '';
      this.insuranceGroup.insPerson = '';
      this.insuranceGroup. insDate = new Date();
      this.insuranceGroup.target = '';
      this.insuranceGroup.endDate = new Date();
      this.insuranceGroup.remarks = '';
    this.visible = true;
  }

  addInsurance() {
    this.insuranceService.addInsurance(this.insuranceGroup).subscribe((res: any) => {
      this.message(res);
      this.getAllInsurance();
    });
    this.visible = false;
  }

/*  getPlateNum() {
    this.insuranceService.getPlateNum().subscribe()((res: any) => {

    });
  }*/

  /*删除一行记录*/
  deleteRow(insuranceGroup: InsuranceGroup) {
        this.insurance = this.insurance.filter(insurance => insurance !== insuranceGroup);
        this.insuranceService.delInsurance(insuranceGroup).subscribe((res: any) => {
          this.message(res);
        });
        this.dataSet = this.insurance;
  }

  private message(res: any) {
    if (res.code === 0) {
      this.msg.create('success', '提示', res.message);
    } else {
      this.msg.create('error', '提示', res.message);
    }
  }

  getAllInsurance() {
    this.insuranceService.getInsuranceList().subscribe((res: any) => {
      this.insurance = res.data;
      this.dataSet = [];
      this.dataSet = [ ...this.insurance ];
    });
  }

  ngOnInit(): void {
    this.getAllInsurance();
  }

  search(): void {
    if (this.searchValue == null || this.searchValue.trim().length === 0) {
      this.dataSet = [ ...this.insurance ];
    }
    const filterFunc = (item) => {
      const bName = item.name.indexOf(this.searchValue) !== -1;
      return bName ;
    };
    const data = this.dataSet.filter(item => filterFunc(item));
    this.dataSet = [ ...data ];
  }
}
