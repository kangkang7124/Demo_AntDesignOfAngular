import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { InitService } from '../../services/init/init-service.service';
import { RuleManagerControllerComponent } from './right-controller/rule-manager-controller/rule-manager-controller.component';
import {CompanyControllerComponent} from './right-controller/company-controller/company-controller.component';
import {TerminalSetComponent} from './right-controller/terminal-controller/terminal-set/terminal-set.component';
import {ChildAgencyCtrComponent} from './right-controller/company-controller/child-agency-ctr/child-agency-ctr.component';
import {SetLogComponent} from './right-controller/terminal-controller/set-log/set-log.component';
import {NewCompanyComponent} from './right-controller/company-controller/new-company/new-company.component';
import {InsuranceControllerComponent} from './right-controller/insurance-controller/insurance-controller.component';
import {NewAgencyComponent} from './right-controller/company-controller/child-agency-ctr/new-agency/new-agency.component';
import {CarDispatchComponent} from './right-controller/car-dispatch/car-dispatch.component';
import {CarMonitorComponent} from './right-controller/car-monitor/car-monitor.component';
import { VehicleControllerComponent } from './right-controller/vehicle-controller/vehicle-controller.component';
import { HistoryLineControllerComponent } from './right-controller/history-line-controller/history-line-controller.component';
import {IccidControllerComponent} from './right-controller/iccid-controller/iccid-controller.component';
const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [ InitService ],
     children: [
      {
        path: 'rules',
        component: RuleManagerControllerComponent ,
        pathMatch: 'full',
        data: {
          title: "规则管理",
          breadcrumb: '规则管理'
        }
       },
       {
         path: 'company',
         component: CompanyControllerComponent ,
         pathMatch: 'full',
         data: {
           title: "公司管理",
           breadcrumb: '公司管理'
         }
       },
       {
         path: 'dispatch',
         component: CarDispatchComponent ,
         pathMatch: 'full',
         data: {
           title: "车辆调遣",
           breadcrumb: '车辆调遣'
         }
       },
       {
         path: 'insurance',
         component: InsuranceControllerComponent ,
         pathMatch: 'full',
         data: {
           title: "保险管理",
           breadcrumb: '保险管理'
         }
       },
       {
         path: 'childagency/:id',
         component: ChildAgencyCtrComponent ,
         pathMatch: 'full',
         data: {
           breadcrumb: '公司管理 / 查看子机构'
         }
       },
       {
         path: 'newcompany',
         component: NewCompanyComponent ,
         pathMatch: 'full',
         data: {
           breadcrumb: '公司管理 / 新增公司'
         }
       },
       {
         path: 'newagency/:id',
         component: NewAgencyComponent ,
         pathMatch: 'full',
         data: {
           breadcrumb: '公司管理 / 查看子机构 / 新增子机构'
         }
       },
       {
         path: 'terminal',
         component: TerminalSetComponent ,
         pathMatch: 'full',
         data: {
           title: "终端设置",
           breadcrumb: '终端设置'
         }
       },
       {
         path: 'logs',
         component: SetLogComponent ,
         pathMatch: 'full',
         data: {
           title: "终端设置日志查询",
           breadcrumb: '终端设置日志查询'
         }
       },
       {
         path: 'monitor',
         component: CarMonitorComponent ,
         pathMatch: 'full',
         data: {
           title: "车辆监控",
           breadcrumb: '车辆监控'
         }
       },
       {
         path: 'vehicle',
         component: VehicleControllerComponent,
         pathMatch: 'full',
         data: {
           title: "车辆管理",
           breadcrumb: '车辆管理'
         }
       },
       {
         path: 'historyline',
         component: HistoryLineControllerComponent,
         pathMatch: 'full',
         data: {
           title: "历史轨迹",
           breadcrumb: '历史轨迹'
         }
       },
       {
         path: 'iccid',
         component: IccidControllerComponent,
         pathMatch: 'full',
         data: {
           title: "ICCID管理",
           breadcrumb: 'ICCID管理'
         }
       }
     ],
    data: {
        title: '亚士德混凝土后台管理',
        breadcrumb: '首页'
      }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class IndexRoutingModule { }
