import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { IMenu } from '../../../interfaces/menu';
@Component({
  selector: 'app-menu-controller',
  templateUrl: './menu-controller.component.html',
  styleUrls: ['./menu-controller.component.less']
})
export class MenuControllerComponent implements OnInit {
  @Input() menu: IMenu;
  @Input() activedMenuId: any;
  @Output() menuOutputEmit: EventEmitter<IMenu> = new EventEmitter();
  @Input() menuCollapsed: boolean;
  constructor() {

  }

  ngOnInit() {

  }

}
