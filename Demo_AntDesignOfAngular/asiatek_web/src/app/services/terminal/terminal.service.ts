import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * 查询终端参数
   */
  public paramQuery(ids, terminalId, companyName, licencePlate): Observable<{}> {
    return this.httpClient.post('/cdms/terminalSet/paramQuery?terminalId=' + terminalId + '&companyName='
      + companyName + '&licencePlate=' + licencePlate, ids);
  }
  /**
   * 设置终端参数
   */
  public paramSet(param, terminalId, companyName, licencePlate): Observable<{}> {
    return this.httpClient.post('/cdms/terminalSet/paramSet?terminalId=' + terminalId + '&companyName='
      + companyName + '&licencePlate=' + licencePlate, param);
  }
  /**
   * 按照时间类型查询终端设置日志
   */
  public query(startTime, endTime, handleType): Observable<{}> {
    return this.httpClient.get('/cdms/terminalSet/query?startTime=' + startTime + '&endTime=' + endTime +
      '&handleType=' + handleType);
  }
  /**
   * 下发文本消息
   */
  public sendText(type, text, terminalId, companyName, licencePlate): Observable<{}> {
    return this.httpClient.get('/cdms/terminalSet/sendText?type=' + type + '&webSocketMessage=' + text + '&terminalId=' +
      terminalId + '&companyName=' + companyName + '&licencePlate=' + licencePlate);
  }
  /**
   * 查询终端属性
   */
  public attributesQuery(terminalId, companyName, licencePlate): Observable<{}> {
    return this.httpClient.get('/cdms/terminalSet/attributesQuery?terminalId=' + terminalId + '&companyName=' +
      companyName + '&licencePlate=' + licencePlate);
  }
  /**
   * 查询所有终端信息
   */
  public getTerminalList(): Observable<{}> {
    return this.httpClient.get('/cdms/terminalSet/getTerminalList');
  }
}
