import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { InsuranceGroup } from 'src/app/interfaces/insuranceGroup';
@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private injector: Injector,
    private notification: NzNotificationService
  ) { }

  /**
   * 
   * 参数： pageNum
   * 参数： pageSize
   * 返回： Page
   */
  public getInsurancePageGroup(pageNum: number, pageSize: number): Observable<{}> {
    return this.httpClient.get('/cdms/insurance/page?pageNum=' + pageNum + '&pageSize=' + pageSize);
  }


  /**
   *  获取保险信息
   */
  public getInsuranceList(): Observable<{}> {
    return this.httpClient.get<InsuranceGroup[]>('/cdms/insurance/list');
  }


  /**
   * 添加保险信息
   */
  public addInsurance(insuranceGroup: InsuranceGroup): Observable<{}> {
    return this.httpClient.post('/cdms/insurance/insurance', insuranceGroup);
  }

  /**
   *删除保险信息
   */
  public delInsurance(insuranceGroup: InsuranceGroup): Observable<{}> {
    return this.httpClient.post('/cdms/insurance/delete', insuranceGroup);
  }
  /**
   * 更改保险信息
   */
  public updateInsurance(insuranceGroup: InsuranceGroup): Observable<{}> {
    return this.httpClient.post('/cdms/insurance/update', insuranceGroup);
  }

  public getPlateNum(): Observable <{}> {
    return this.httpClient.get('/cdms/insurance/getPlateNum');
  }

}
