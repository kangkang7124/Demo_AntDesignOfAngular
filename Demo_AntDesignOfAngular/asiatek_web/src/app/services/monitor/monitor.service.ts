import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  /**
   * 查询登录用户对应的公司名称
   */
  public queryCompanyName(): Observable<{}> {
    return this.httpClient.get('/cdms/monitor/queryCompanyName');
  }
  /**
   * 根据公司名称查询对应的所有终端的当前定位信息
   */
  public queryCurrentLocation(companyName): Observable<{}> {
    return this.httpClient.get('/cdms/monitor/queryCurrentLocation?companyName=' + companyName);
  }
}
