import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SimManufacturerService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * 获取所有sim厂商信息
   */
  public getAll(): Observable<{}> {
    return this.httpClient.get('/cdms/simManufacturer/getAll');
  }
}
