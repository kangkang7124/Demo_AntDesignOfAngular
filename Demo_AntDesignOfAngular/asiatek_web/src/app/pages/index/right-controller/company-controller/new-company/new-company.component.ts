import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.less']
})
export class NewCompanyComponent implements OnInit {

  validateForm: FormGroup;


  submitForm(): void {
    const api = '/cdms/company/save';
    this.http.post(api, this.validateForm.value).subscribe((response: any) => {
      if (0 === response.code) {
        this.router.navigateByUrl('/index/company');
      } else {
        this.notification.create('error', '提示', "提交出错！");
      }
    });
  }

  constructor(private fb: FormBuilder, public http: HttpClient,  private router: Router, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name       :  null,
      enName     :  null,
      shortName  :  null,
      address    :  null,
      dutyPerson :  null,
      mobile     :  null,
      phone      :  null,
      zipCode    :  null,
      fax        :  null,
      remarks    :  null
    });
  }

}
