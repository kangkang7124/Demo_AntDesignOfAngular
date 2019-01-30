import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public findPage(data: FormGroup): Observable<{}> {
    let url = '/cdms/vehicle/index';
    if (data != null) {
      url += '?';
      if (data.value.plateNum != null) {
        url += 'plateNum=' + data.value.plateNum + '&';
      }
      if (data.value.vehicleVin != null) {
        url += 'vehicleVin=' + data.value.vehicleVin + '&';
      }
      if (data.value.carType != null) {
        url += 'carType=' + data.value.carType + '&';
      }
      if (data.value.capacity != null) {
        url += 'capacity=' + data.value.capacity + '&';
      }
      if (data.value.ownerName != null) {
        url += 'ownerName=' + data.value.ownerName + '&';
      }
      if (data.value.transName != null) {
        url += 'transName=' + data.value.transName + '&';
      }
      if (data.value.num != null) {
        url += 'num=' + data.value.num;
      }
    }
    if (url.endsWith('&')) {
      url = url.substr(0, url.length - 1);
    }
    return this.httpClient.get(url);
  }

  public findDetail(id: String): Observable<{}> {
    return this.httpClient.get('/cdms/vehicle/detail?id=' + id);
  }

  public delete(id: String): Observable<{}> {
    return this.httpClient.get('/cdms/vehicle/delete?id=' + id);
  }

  public findCompanyList(): Observable<{}> {
    return this.httpClient.get('/cdms/company/getAllCompany');
  }

  public save(data: FormGroup): Observable<{}> {
    let url = '/cdms/vehicle/save';
    if (data != null) {
      url += '?';
      if (data.value.id != null) {
        url += 'id=' + data.value.id + '&';
      }
      if (data.value.plateNum != null) {
        url += 'plateNum=' + data.value.plateNum + '&';
      }
      if (data.value.vehicleVin != null) {
        url += 'vehicleVin=' + data.value.vehicleVin + '&';
      }
      if (data.value.carType != null) {
        url += 'carType=' + data.value.carType + '&';
      }
      if (data.value.capacity != null) {
        url += 'capacity=' + data.value.capacity + '&';
      }
      if (data.value.ownerId != null) {
        url += 'ownerId=' + data.value.ownerId + '&';
      }
      if (data.value.transId != null) {
        url += 'transId=' + data.value.transId + '&';
      }
      if (data.value.num != null) {
        url += 'num=' + data.value.num;
      }
    }
    if (url.endsWith('&')) {
      url = url.substr(0, url.length - 1);
    }
    return this.httpClient.get(url);
  }

}
