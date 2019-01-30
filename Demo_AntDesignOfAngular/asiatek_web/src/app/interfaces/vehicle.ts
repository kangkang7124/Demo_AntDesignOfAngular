import { User } from './user';
import { Time } from '@angular/common';

export interface Vehicle {
    id: String;
    plateNum: String;
    vehicleVin: String;
    carType: String;
    capacity: number;
    ownerName: String;
    ownerId: String;
    createBy: User;
    createDate: Time;
    updateBy: User;
    updateDate: Time;
    remarks: String;
    /* 车辆自编号 */
    num: number;
    transId: String;
    transName: String;
}
