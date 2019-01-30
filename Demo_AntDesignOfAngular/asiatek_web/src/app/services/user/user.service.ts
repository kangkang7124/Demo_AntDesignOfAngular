import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { MENU_LIST } from '../../services/local-storage/local-storage.namespace';
import { Router } from '@angular/router';

import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { NzNotificationService } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private injector: Injector,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private notification: NzNotificationService
  ) { }

  public login(value: any): any {
    this.httpClient.post('/login', value)
      .subscribe((res: any) => {
        this.localStorageService.set(MENU_LIST, res.data);
        if (res.code === 0) {
          this.router.navigateByUrl('/index');
        } else {
          this.notification.create('error', '提示', res.message);
        }

      });
  }

  public logOut() {
    this.tokenService.clear();
    this.localStorageService.remove(MENU_LIST);
    this.httpClient.get('/logout').subscribe((res: any) => {
      this.router.navigateByUrl('/login');
    });

  }
}
