import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { InsuranceGroup } from 'src/app/interfaces/insuranceGroup';
import {Company} from '../../interfaces/company';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private injector: Injector,
    private notification: NzNotificationService
  ) { }

  /**
   * 分页获规则组
   * 参数： pageNum
   * 参数： pageSize
   * 返回： Page
   */
  public getInsurancePageGroup(pageNum: number, pageSize: number): Observable<{}> {
    return this.httpClient.get('/cdms/insurance/page?pageNum=' + pageNum + '&pageSize=' + pageSize);
  }


  /**
   * 获取所有公司
   */
  public getCompanyList(): Observable<{}> {
    return this.httpClient.get<Company[]>('/cdms/company/getAllCompany');
  }


  /**
   * 添加规则组
   */
  public addInsurance(insuranceGroup: InsuranceGroup): Observable<{}> {
    return this.httpClient.post('/cdms/insurance/insurance', insuranceGroup);
  }

  /**
   * 删除公司
   */
  public delCompany(id: string): Observable<{}> {
    let api = '/cdms/company/delete?id=' + id;
    return this.httpClient.get(api);
  }

  /*根据id, 获取下级机构*/
  public getAgency(id: string): Observable<{}> {
    let api = '/cdms/company/getAgency?id=' + id;
    return this.httpClient.get(api);
  }

  /**
   * 更新规则组
   */
  public updateInsurance(insuranceGroup: InsuranceGroup): Observable<{}> {
    return this.httpClient.post('/cdms/insurance/update', insuranceGroup);
  }

}
