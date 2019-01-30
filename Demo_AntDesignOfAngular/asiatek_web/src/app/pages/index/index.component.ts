import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  Output
} from '@angular/core';
import { MENU_LIST } from '../../services/local-storage/local-storage.namespace';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { IMenu } from '../../interfaces/menu';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  activedMenu: any;
  menuList: IMenu[] = [];

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
  // 激活menu节点
  activeMenuItem(item: IMenu) {
    this.activedMenu = item;
  }

  logout() {
    this.userService.logOut();
  }
  ngOnInit() {
    const menus = this.localStorageService.get(MENU_LIST);
    this.menuList = menus[0];
    this.activedMenu = this.menuList = this.menuList[0].children;
    this.activeMenuItem(this.activedMenu);
  }
}
