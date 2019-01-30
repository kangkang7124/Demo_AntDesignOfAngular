import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.less']
})
export class VehicleEditComponent implements OnInit {

  editForm: FormGroup;
  isVisible = false;
  isLoading = false;
  modelTitle: String;
  vehicle: Vehicle;
  companyList: any[] = [];
  stationList: any[] = [];
  @Output() refresh = new EventEmitter<boolean>();


  constructor(
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) { }

  findDetail(id: String): void {
    this.vehicleService.findDetail(id).subscribe((res: any) => {
      this.vehicle = res.data;
      this.setData();
      this.isVisible = true;
    });
  }

  setData() {
    this.findCompanyList();
    this.editForm = this.fb.group({
      id: [ this.vehicle.id ],
      plateNum: [ this.vehicle.plateNum, [ Validators.required ]],
      vehicleVin: [ this.vehicle.vehicleVin ],
      carType: [ this.vehicle.carType ],
      capacity: [ this.vehicle.capacity ],
      ownerId: [ this.vehicle.ownerId ],
      num: [ this.vehicle.num ],
      transId: [ this.vehicle.transId ]
    });
  }

  saveVehicle() {
    this.vehicleService.save(this.editForm).subscribe((res: any) => {
      this.isLoading = false;
      this.isVisible = false;
      if (res.code === 0) {
        this.message.success('保存成功！');
        this.refresh.emit();
      } else if (res.code === 401) {
        alert('登陆超时，请重新登陆！');
        this.router.navigateByUrl('/login');
      } else {
        alert('网络错误，请稍后再试！');
      }
    });
  }

  handleOk() {
    this.isLoading = true;
    this.saveVehicle();
  }

  handleCancel() {
    this.isVisible = false;
  }

  findCompanyList(): void {
    this.vehicleService.findCompanyList().subscribe((res: any) => {
      if (res.code === 3011) {
        /* alert("登陆超时，请重新登陆！");
        this.router.navigateByUrl('/login'); */
      } else {
        this.companyList = res;
        this.stationList = res;
      }
    });
  }

  ngOnInit() {
    this.vehicle = {
      id : '',
      plateNum : '',
      vehicleVin : '',
      carType : '',
      capacity : null,
      ownerName : '',
      ownerId: '',
      createBy: null,
      createDate: null,
      updateBy: null,
      updateDate: null,
      remarks: '',
      num: null,
      transId: '',
      transName: ''
    };
    this.setData();
  }

}
