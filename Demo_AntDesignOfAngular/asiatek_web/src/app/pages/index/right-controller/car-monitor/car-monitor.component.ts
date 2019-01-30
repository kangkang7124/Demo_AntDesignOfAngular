import {Component, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import * as format from 'date-fns/format';
import {WebSocketMessage} from '../../../../interfaces/webSocketMessage';
import {Router, NavigationStart} from '@angular/router';
import {MonitorService} from '../../../../services/monitor/monitor.service';

declare var AMap: any;

@Component({
  selector: 'app-car-monitor',
  templateUrl: './car-monitor.component.html',
  styleUrls: ['./car-monitor.component.less']
})

export class CarMonitorComponent implements OnInit, AfterViewChecked {
  @ViewChild('webSocketMessageDiv') webSocketMessageDiv;
  icon = new AMap.Icon({
    size: new AMap.Size(35, 35),
    image: '../../../../assets/image/normal.png',
    imageSize: new AMap.Size(35, 35)
  });
  terminalMap = {};
  map = null;
  mapHeight: number;
  buttonType = 'primary';
  switchValue = false;
  loading = false;
  URL = 'ws://172.16.5.97:9999/test';
  webSocket = null;
  webSocketState = 'close';
  monitorVisible = false;
  timer = null;
  interval = 180000;
  identity = {'companyName' : '', 'online': '', 'heartbeat': '', 'dataType': 'websocket'};
  num = 0;
  searchValue = '';
  private sendMessage(message) {
    console.log(new Date(), message);
    if (message == null) return;
    let sendMessage = (message instanceof Object || message instanceof Array) ? JSON.stringify(message) : String(message);
    this.webSocket.send(sendMessage);
  }
  private setWebSocketMessage(message) {
    this.webSocketMessageDiv.nativeElement.innerHTML += format(new Date(), 'YYYY-MM-DD HH:mm:ss') + ' ' + message + '<br/>';
    this.num++;
    if (this.num >= 1000) {
      this.save();
      this.webSocketMessageDiv.nativeElement.innerHTML = '';
      this.num = 0;
    }
  }
  private closeWebSocket() {
    this.identity.online = 'false';
    this.identity.heartbeat = 'false';
    this.sendMessage(this.identity);
    this.webSocket.close();
  }
  private createAndAddMaker(terminalId, longitude, latitude, time, icon): any {
    let marker = new AMap.Marker({
      icon: icon,
      position: [longitude, latitude]
    });
    if (this.terminalMap.hasOwnProperty(terminalId)) {
      this.map.remove(this.terminalMap[terminalId].marker);
    }
    this.terminalMap[terminalId] = {'marker': marker, 'time': time};
    this.map.add(marker);
    return marker;
  }
  private addInfoWindow(marker, content) {
    let infoWindow = new AMap.InfoWindow({
      content: content,
      offset: new AMap.Pixel(10, -10),
      size: new AMap.Size(280, 0)
    });
    AMap.event.addListener(marker, 'mouseover', (): any => {
      infoWindow.open(this.map, marker.getPosition());
    });
    AMap.event.addListener(marker, 'mouseout', (): any => {
      infoWindow.close();
    });
  }
  private overtimeHandle() {
    let time = new Date().getTime() - 1000 * 60 * 3;
    for (let terminalId in this.terminalMap) {
      if(this.terminalMap[terminalId].time < time) {
        this.addInfoWindow(this.terminalMap[terminalId].marker, '终端号：' + terminalId + '<br/>报警信息：超过3分钟没有定位信息<br/>报警时间：' + format(new Date(), 'YYYY-MM-DD HH:mm:ss'));
        this.setWebSocketMessage(terminalId + ' 超过3分钟没有定位信息');
        if (!this.monitorVisible && this.buttonType != 'danger') this.buttonType = 'danger';
      }
    }
  }
  clickSwitch(): void {
    if (this.webSocketState === 'open' && this.webSocket != null) {
      this.closeWebSocket();
    } else {
      this.loading = true;
      this.webSocket = new WebSocket(this.URL);
      this.webSocket.onopen = ((event): any => {
        this.switchValue = true;
        this.webSocketState = event.type;
        this.setWebSocketMessage('建立监控连接');
        this.identity.online = 'true';
        this.identity.heartbeat = 'false';
        this.sendMessage(this.identity);
        this.timer = window.setInterval(() => {
          this.identity.heartbeat = 'true';
          this.sendMessage(this.identity);
          // 定时检测是否在线，遍历terminalMap，比较时间，超过3分钟报错不在线
          this.overtimeHandle();
        }, this.interval);
      });
      this.webSocket.onerror = ((): any => {
        this.setWebSocketMessage('监控连接异常');
      });
      this.webSocket.onclose = ((event): any => {
        this.switchValue = false;
        this.webSocketState = event.type;
        this.setWebSocketMessage('监控连接关闭');
        if(this.timer != null) window.clearInterval(this.timer);
      });
      this.webSocket.onmessage = ((event): any => {
        let data: WebSocketMessage = JSON.parse(event.data);
        if (data.warningMessage != undefined) {
          this.setWebSocketMessage(data.terminalLocationMsg.terminalId + ' ' + data.warningMessage);
          if (!this.monitorVisible && this.buttonType != 'danger') this.buttonType = 'danger';
        }
        let marker = this.createAndAddMaker(data.terminalLocationMsg.terminalId, data.terminalLocationMsg.gdLongitude, data.terminalLocationMsg.gdLatitude, new Date().getTime(), this.icon);
        let content = data.warningMessage == undefined ? '终端号：' + data.terminalLocationMsg.terminalId + '<br/>' + '状态：正常' : '终端号：' + data.terminalLocationMsg.terminalId + '<br/>' + '报警信息：' + data.warningMessage + '<br/>' + '报警时间：' + format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        this.addInfoWindow(marker, content);
      });
      window.onbeforeunload = ((): any => {
        this.closeWebSocket();
        if(this.timer != null) window.clearInterval(this.timer);
      });
      this.loading = false;
    }
  }
  ngAfterViewChecked() {
    this.webSocketMessageDiv.nativeElement.scrollTop = this.webSocketMessageDiv.nativeElement.scrollHeight;
  }
  showWarningLog() {
    this.monitorVisible = true;
    this.buttonType = 'primary';
  }
  handleCancel() {
    this.monitorVisible = false;
  }
  clear() {
    this.webSocketMessageDiv.nativeElement.innerHTML = '';
  }
  save() {
    let value = this.webSocketMessageDiv.nativeElement.innerHTML.replace(/<br>/ig, '\r\n');
    let filename = 'message ' + format(new Date(), 'YYYY-MM-DD-HHmmss') + '.txt';
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('href', 'data:text/html;gb2312,' + value);
    a.setAttribute('download', filename);
    a.setAttribute('target', '_blank');
    a.style.display = 'none';
    a.click();
    document.body.removeChild(a);
  }
  search() {
    let b = true;
    for(let terminalId in this.terminalMap){
      if(this.searchValue == terminalId){
        this.map.setZoomAndCenter(18, this.terminalMap[this.searchValue].getPosition());
        b = false;
        break;
      }
    }
    if (b) alert('没有查到此终端信息');
  }
  constructor(private router: Router, private monitorService: MonitorService) {
  }
  ngOnInit() {
    this.mapHeight = window.innerHeight - 152;
    this.map = new AMap.Map('container', {
      zoom: 14,
      resizeEnable: true
    });
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], (): any => {
      this.map.addControl(new AMap.ToolBar());
      this.map.addControl(new AMap.Scale());
    });
    this.monitorService.queryCompanyName().subscribe((response: any) => {
      console.log(response);
      if(response.state){
        this.identity.companyName = response.data;
        this.monitorService.queryCurrentLocation(this.identity.companyName).subscribe((response: any) => {
          console.log(response);
          if (response.state) {
            response.data.forEach(item => (this.addInfoWindow(this.createAndAddMaker(item.terminalId, item.gdLongitude, item.gdLatitude, item.time, this.icon), '终端号：' + item.terminalId)));
          } else {
            alert(response.message);
          }
        });
      } else {
        alert(response.message);
      }

    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.webSocketState === 'open' && this.webSocket != null) {
        this.closeWebSocket();
        console.log('切换路由页面，关闭webSocket');
      };
    });
  }
}
