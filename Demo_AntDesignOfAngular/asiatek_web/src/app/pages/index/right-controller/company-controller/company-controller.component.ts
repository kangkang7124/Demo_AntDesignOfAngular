import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from '../../../../interfaces/company';
import {CompanyService} from '../../../../services/company/company.service';
import {NzDropdownContextComponent, NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-company-controller',
  templateUrl: './company-controller.component.html',
  styleUrls: ['./company-controller.component.less']
})
export class CompanyControllerComponent implements OnInit {

  constructor(public http: HttpClient, private companyService: CompanyService) { }

  dropdown: NzDropdownContextComponent;

  nodes = [ {
    title   : '南京亚士德总公司',
    key     : '100',
    expanded: false,
    children: [ {
      title   : '分公司1',
      key     : '123',
      expanded: false,
      children: [
        { title: '厂地1', key: '320', isLeaf: true },
        { title: '厂地2', key: '322', isLeaf: true },
        { title: '厂地3', key: '329', isLeaf: true }
      ]
    }, {
      title   : '分公司2',
      key     : '1002',
      children: [
        { title: '厂地1', key: '10020', isLeaf: true }
      ]
    }, {
      title   : '分公司3',
      key     : '1003',
      children: [
        { title: '厂地1', key: '10030', isLeaf: true },
        { title: '厂地2', key: '10031', isLeaf: true }
      ]
    } ]
  } ,
    {
      title   : '南京汇鎏总公司',
      key     : '100',
      expanded: false,
      children: [ {
        title   : '分公司1',
        key     : '1001',
        expanded: false,
        children: [
          { title: '厂地1', key: '10010', isLeaf: true },
          { title: '厂地2', key: '10011', isLeaf: true },
          { title: '厂地3', key: '10012', isLeaf: true }
        ]
      }, {
        title   : '分公司2',
        key     : '1002',
        children: [
          { title: '厂地1', key: '10020', isLeaf: true }
        ]
      }, {
        title   : '分公司3',
        key     : '1003',
        children: [
          { title: '厂地1', key: '10030', isLeaf: true },
          { title: '厂地2', key: '10031', isLeaf: true }
        ]
      } ]
    }
  ];
  /*nodes = [];*/

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }


  /*获取全部公司信息*/
  getData() {
    this.companyService.getCompanyList().subscribe((res: any) => {
      this.nodes = res.data;
      console.log(res);
    });
  }

  ngOnInit() {
     this.getData();
  }
  selectDropdown(type: string): void {
    this.dropdown.close();
    // do something
  }
  /*openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      data.node.isExpanded = !data.node.isExpanded;
    }
  }*/

}
