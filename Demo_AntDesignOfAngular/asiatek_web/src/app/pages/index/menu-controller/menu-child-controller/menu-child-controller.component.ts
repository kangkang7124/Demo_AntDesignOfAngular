import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMenu } from '../../../../interfaces/menu';
@Component({
  selector: 'app-menu-child-controller',
  templateUrl: './menu-child-controller.component.html',
  styleUrls: ['./menu-child-controller.component.less']
})
export class MenuChildControllerComponent implements OnInit {
  @Input() child: IMenu;
  @Input() activedMenuId: string;
  @Output() clickEmit: EventEmitter<IMenu> = new EventEmitter();
  @Input() menuTitleCollapsed: boolean;
  constructor() { }

  ngOnInit() {
  }

}
