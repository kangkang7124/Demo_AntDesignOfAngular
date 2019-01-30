import {Component, Input, OnInit} from '@angular/core';
import {CompanyControllerComponent} from '../company-controller.component';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../../../../interfaces/company';
import {CompanyService} from '../../../../../services/company/company.service';

@Component({
  selector: 'app-child-agency-ctr',
  templateUrl: './child-agency-ctr.component.html',
  styleUrls: ['./child-agency-ctr.component.less']
})
export class ChildAgencyCtrComponent implements OnInit {
  // 父级机构Id
  public parentId: string;

  allChecked = false;
  dataSet = [];
  indeterminate = false;

  // 定义模态窗口参数
  title = '公司详情';
  isVisible = false;
  modelData: Company = {
    id: '',
    type: '',
    parentId: '',
    parentIds: '',
    name: '',
    enName: '',
    shortName: '',
    address: '',
    zipCode: '',
    fax: '',
    dutyPerson: '',
    mobile: '',
    phone: '',
    sort: '',
    createBy: '',
    createDate: '',
    updateBy: '',
    updateDate: '',
    remarks: '',
    delFlag: ''
};
  searchValue = '';

  constructor(public route: ActivatedRoute, public http: HttpClient, private companyService: CompanyService) { }

  /*关闭模态窗口*/
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  /*显示本记录的详情*/
  showInfo(data) {
    this.title = '公司详情';
    this.modelData = data;
    this.isVisible = true;
  }

  /*删除一行记录*/
  deleteRow(id: string) {
    this.companyService.delCompany(id).subscribe();
    const dataSet = this.dataSet.filter(d => d.id !== id);
    console.log(dataSet);
    this.dataSet = dataSet;
  }

  getData(id: string) {
    this.companyService.getAgency(id).subscribe((res: any) => {
      this.dataSet = res.data;
    });
  }
  ngOnInit() {
    this.parentId = this.route.snapshot.params['id'];
    this.getData(this.parentId);
  }

}
