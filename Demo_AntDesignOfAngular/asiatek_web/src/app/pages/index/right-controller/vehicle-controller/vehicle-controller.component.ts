import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-controller',
  templateUrl: './vehicle-controller.component.html',
  styleUrls: ['./vehicle-controller.component.less']
})
export class VehicleControllerComponent implements OnInit {

  searchForm: FormGroup;
  datalist: Vehicle[];
  @ViewChild('editModel')
  private editModel: VehicleEditComponent;
  private loading = true;
  private sortName = null;
  private sortValue = null;

  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) { }

  search(): void {
    this.loading = true;
    this.vehicleService.findPage(this.searchForm).subscribe((res: any) => {
      this.loading = false;
      if (res.code === 0) {
        if (res.data != null) {
          this.datalist = res.data;
          if (this.sortName && this.sortValue) {
            // tslint:disable-next-line:max-line-length
            this.datalist = this.datalist.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
          }
        } else {
          this.datalist = [];
        }
      } else if (res.code === 401) {
        this.router.navigateByUrl('/login');
      } else {
        this.message.error('网络错误，请稍后再试！');
      }
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  refresh() {
    this.search();
  }

  reset(): void {
    this.searchForm.reset();
  }

  addVehicle(): void {
    this.editModel.modelTitle = '车辆信息添加';
    this.editModel.editForm.reset();
    this.editModel.isVisible = true;
  }

  showEdit(id: String): void {
    this.editModel.modelTitle = '车辆信息修改';
    this.editModel.findDetail(id);
  }

  deleteVehicle(id: String): void {
    this.loading = true;
    this.vehicleService.delete(id).subscribe((res: any) => {
      this.loading = false;
      if (res.code === 0) {
        this.search();
        this.message.success('删除成功！');
      } else if (res.code === 401) {
        alert('登陆超时，请重新登陆！');
        this.router.navigateByUrl('/login');
      } else {
        this.message.error('网络错误，请稍后再试！');
      }
    });
  }

  cancelDelete(): void {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      plateNum: [],
      vehicleVin: [],
      carType: [],
      capacity: [],
      ownerName: [],
      transName: [],
      num: []
    });
    this.search();
  }

}
