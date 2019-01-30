import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  constructor(private httpClient: HttpClient, private injector: Injector) {}

  public getAreaDate(): Observable<{}> {
    return this.httpClient.get('../assets/area_code_2018.json');
  }
}
