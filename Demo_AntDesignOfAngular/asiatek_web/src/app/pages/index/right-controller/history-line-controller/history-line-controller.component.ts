import { Component, OnInit } from '@angular/core';
import { HistorylineService } from 'src/app/services/historyline/historyline.service';

declare var AMap: any;

@Component({
  selector: 'app-history-line-controller',
  templateUrl: './history-line-controller.component.html',
  styleUrls: ['./history-line-controller.component.less']
})
export class HistoryLineControllerComponent implements OnInit {

  mapHeight: number;
  searchValue: String;
  speed = 1000;
  startDisabled = 'Disabled';
  resetDisabled = 'Disabled';
  nodes = [];
  searchText: String;
  replayChecked: boolean;
  unloadingChecked: boolean;

  constructor(
    private historylineService: HistorylineService
  ) { }

  initMap(): void {
  }

  changeSpeed(speed: number): void {
    this.speed = speed;
  }

  getTreeData() {
    this.historylineService.getTreeData(this.searchText).subscribe((res: any) => {
      this.nodes = res.data;
    });
  }

  searchData() {

  }

  startRun() {

  }

  resetRun() {

  }

  nzClick(id: String) {

  }

  nzSelect(id: String) {

  }

  ngOnInit() {
    this.mapHeight = window.innerHeight - 158;
    const map = new AMap.Map('container', {
      zoom : 3,
      zooms: [3, 18]
    });
    this.getTreeData();
  }

}
