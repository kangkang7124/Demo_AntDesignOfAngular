import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HeaderControllerComponent } from './header-controller/header-controller.component';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { MenuControllerComponent } from './menu-controller/menu-controller.component';
import { MenuChildControllerComponent } from './menu-controller/menu-child-controller/menu-child-controller.component';
import { RuleManagerControllerComponent } from './right-controller/rule-manager-controller/rule-manager-controller.component';
import { FooterControllerModule } from './footer-controller/footer-controller.module';
import { CompanyControllerComponent } from './right-controller/company-controller/company-controller.component';
import { TerminalSetComponent } from './right-controller/terminal-controller/terminal-set/terminal-set.component';
import { RuleAddComponent } from './right-controller/rule-manager-controller/rule-group-operation/rule-operation.component';
import { ChildAgencyCtrComponent } from './right-controller/company-controller/child-agency-ctr/child-agency-ctr.component';
import { SetLogComponent } from './right-controller/terminal-controller/set-log/set-log.component';
import { NewCompanyComponent } from './right-controller/company-controller/new-company/new-company.component';
import { RuleListComponent } from './right-controller/rule-manager-controller/rule-list/rule-list.component';
import { RuleListOperationComponent } from './right-controller/rule-manager-controller/rule-list-operation/rule-list-operation.component';
import { RuleFromModule } from './right-controller/rule-manager-controller/rule-from/rule-from.module';
import { InsuranceControllerComponent} from './right-controller/insurance-controller/insurance-controller.component';
import {CarDispatchComponent} from './right-controller/car-dispatch/car-dispatch.component';
import {CarMonitorComponent} from './right-controller/car-monitor/car-monitor.component';
import {NewAgencyComponent} from './right-controller/company-controller/child-agency-ctr/new-agency/new-agency.component';
import {VehicleControllerComponent} from './right-controller/vehicle-controller/vehicle-controller.component';
import {HistoryLineControllerComponent} from './right-controller/history-line-controller/history-line-controller.component';
import { VehicleEditComponent } from './right-controller/vehicle-controller/vehicle-edit/vehicle-edit.component';
import { RuleMapComponent } from './right-controller/rule-manager-controller/rule-map/rule-map.component';
import { IccidControllerComponent } from './right-controller/iccid-controller/iccid-controller.component';
import { FenceListComponent } from './right-controller/rule-manager-controller/rule-map/fence-list/fence-list.component';

@NgModule({
  declarations: [
    HeaderControllerComponent,
    IndexComponent,
    MenuControllerComponent,
    MenuChildControllerComponent,
    RuleManagerControllerComponent,
    CompanyControllerComponent,
    TerminalSetComponent,
    RuleAddComponent,
    ChildAgencyCtrComponent,
    TerminalSetComponent,
    SetLogComponent,
    NewCompanyComponent,
    RuleListComponent,
    RuleListOperationComponent,
    InsuranceControllerComponent,
    CarDispatchComponent,
    CarMonitorComponent,
    NewAgencyComponent,
    VehicleControllerComponent,
    VehicleEditComponent,
    HistoryLineControllerComponent,
    RuleMapComponent,
    IccidControllerComponent,
    FenceListComponent
  ],
  imports: [
    NgZorroAntdModule,
    IndexRoutingModule,
    FormsModule,
    CommonModule,
    FooterControllerModule,
    RuleFromModule,
    ReactiveFormsModule
  ]
})
export class IndexModule { }
