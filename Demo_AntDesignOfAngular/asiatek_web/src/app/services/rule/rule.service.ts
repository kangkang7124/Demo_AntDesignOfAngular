import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { RuleGroup } from 'src/app/interfaces/ruleGroup';
@Injectable({
  providedIn: 'root'
})
export class RuleService {
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
  public getRulePageGroup(pageNum: number, pageSize: number): Observable<{}> {
    return this.httpClient.get('/cdms/ruleGroup/page?pageNum=' + pageNum + '&pageSize=' + pageSize);
  }


  /**
  * 获取所有规则组
  */
  public getRuleGroupList(): Observable<{}> {
    return this.httpClient.get<RuleGroup[]>('/cdms/ruleGroup/list');
  }


  /**
 * 添加规则组
 */
  public addRuleGroup(ruleGroup: RuleGroup): Observable<{}> {
    return this.httpClient.post('/cdms/ruleGroup/rule', ruleGroup);
  }

  /**
 * 删除规则组
 */
  public delRuleGroup(ruleGroup: RuleGroup): Observable<{}> {
    return this.httpClient.post('/cdms/ruleGroup/delete', ruleGroup);
  }
  /**
 * 更新规则组
 */
  public updateRuleGroup(ruleGroup: RuleGroup): Observable<{}> {
    return this.httpClient.post('/cdms/ruleGroup/update', ruleGroup);
  }

}
