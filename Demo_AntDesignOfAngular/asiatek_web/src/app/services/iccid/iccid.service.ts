import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IccidService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * 根据查询条件查询iccid数据
   */
  public search(searchValue: Object): Observable<{}> {
    return this.httpClient.post('/cdms/iccid/search', searchValue);
  }

  /**
   * 保存iccid数据,单条
   */
  public save(handleType, iccid: Object): Observable<{}> {
    return handleType == 'edit' ? this.httpClient.post('/cdms/iccid/update', iccid) : this.httpClient.post('/cdms/iccid/save', iccid);
  }

  /**
   * 删除iccid，批量删除
   */
  public delete(ids): Observable<{}> {
    return this.httpClient.post('/cdms/iccid/delete', ids);
  }

}
