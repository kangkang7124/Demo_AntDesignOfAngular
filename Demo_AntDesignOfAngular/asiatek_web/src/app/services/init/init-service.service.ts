import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { MENU_LIST } from '../../services/local-storage/local-storage.namespace';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let init = false;
    let token = this.tokenService.get<JWTTokenModel>(JWTTokenModel).token;
    const menuList = this.localStorageService.get(MENU_LIST);
    const isExistMenu = menuList === null || menuList === undefined;
    if (token != undefined && token != null) {
      if (!this.tokenService.get<JWTTokenModel>(JWTTokenModel).isExpired() && !isExistMenu) {
        init = true;
      }
    }
    if (state.url.includes('login') && init) {
      this.router.navigateByUrl('/index');
      return false;
    }
    if (!state.url.includes('login') && !init) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
