import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';

declare var AMap: any;
@Component({
  selector: 'app-rule-map',
  templateUrl: './rule-map.component.html',
  styleUrls: ['./rule-map.component.less']
})
export class RuleMapComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() isCloseModle: boolean;
  @Output() isClose: EventEmitter<boolean> = new EventEmitter();
  drawType: any;
  constructor() {}
  private gaoDeMap: any;
  mouseTool: any;
  overlays: any[] = [];
  handleOk(): void {
    this.isCloseModle = false;
    this.isClose.emit(this.isCloseModle);
  }

  handleCancel(): void {
    this.isCloseModle = false;
    this.isClose.emit(this.isCloseModle);
  }
  ngOnChanges() {}

  ngOnInit() {}
  /**
   *初始化高德地图以及插件
   */
  initGaoDeMap(): any {
    const map = new AMap.Map('map-container', {
      resizeEnable: true,
      zoom: 3,
      zooms: [3, 18]
    });
    AMap.plugin(
      [
        'AMap.ToolBar',
        'AMap.PolyEditor',
        'AMap.CircleEditor',
        'AMap.RectangleEditor',
        'AMap.MouseTool',
        'AMap.Autocomplete',
        'AMap.PlaceSearch'
      ],
      function() {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.PolyEditor());
        map.addControl(new AMap.CircleEditor());
        map.addControl = new AMap.MouseTool();
        map.addControl = new AMap.RectangleEditor();
        map.addControl = new AMap.PlaceSearch();
        map.addControl = new AMap.Autocomplete();
      }
    );
    // 输入提示
    this.poiTips(map);
    return map;
  }

  /**
   * poi 输入提示
   */
  private poiTips(map: any) {
    const autoOptions = {
      input: 'tipinput'
    };
    const auto = new AMap.Autocomplete(autoOptions);
    const placeSearch = new AMap.PlaceSearch({
      map: map
    }); // 构造地点查询类
    AMap.event.addListener(auto, 'select', select); // 注册监听，当选中某条记录时会触发
    function select(e: { poi: { adcode: any; name: any } }) {
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name, function(status, result) {
        // 查询成功时，result即对应匹配的POI信息
        const pois = result.poiList.pois;
        for (let i = 0; i < pois.length; i++) {
          const poi = pois[i];
          const marker = [];
          marker[i] = new AMap.Marker({
            position: poi.location,
            title: poi.name
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker[i]);
        }
        map.setFitView();
      });
    }
  }

  /**
   * 绘制图形
   */
  drawGraph(type: string): void {
    this.mouseTool = new AMap.MouseTool(this.gaoDeMap);
    const map = this.gaoDeMap;
    let overlays = [];
    // 监听draw事件可获取画好的覆盖物
    this.mouseTool.on('draw', function(e: { obj: any }) {
      overlays.push(e.obj);
    });
    this.mouseTool.on('draw', function(event: any) {
      if (overlays.length === 2) {
        map.remove(overlays[0]);
        overlays.shift();
        console.log(this.overlays);
      }
      if (overlays.length > 0) {
        const newOverlays = [];
        newOverlays.push(overlays[overlays.length - 1]);
        overlays = newOverlays;
      }
    });
    this.overlays = overlays;
    this.drawBycase(type);
  }

  /**
   * 根据选择类型绘制图形
   */
  drawBycase(type: string): void {
    const map = this.gaoDeMap;
    const marker = new AMap.Marker({
      offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(map);

    const setOption = {
      isOutline: true,
      borderWeight: 3,
      strokeColor: '#fc0400',
      strokeWeight: 6,
      strokeOpacity: 0.5,
      fillOpacity: 0.4,
      // 线样式还支持 'dashed'
      fillColor: '#4633fc',
      zIndex: 50,
      draggable: true
    };
    switch (type) {
      case 'polygon': {
        this.mouseTool.polygon(setOption);
        break;
      }
      case 'rectangle': {
        this.mouseTool.rectangle(setOption);
        break;
      }
      case 'circle': {
        this.mouseTool.circle(setOption);
        break;
      }
    }
  }

  /**
   * 调用初始化地图方法初始化地图
   */
  ngAfterViewInit(): void {
    this.gaoDeMap = this.initGaoDeMap();
  }
}
