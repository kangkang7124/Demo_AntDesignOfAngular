import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorylineService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getTreeData(searchText: String): Observable<{}> {
    let url = '/cdms/historyline/treeData';
    if (searchText != null && searchText !== '') {
      url += '?searchText=' + searchText;
    }
    return this.httpClient.get(url);
  }

}
