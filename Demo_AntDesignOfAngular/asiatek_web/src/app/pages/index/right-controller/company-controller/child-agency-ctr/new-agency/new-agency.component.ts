import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-new-agency',
  templateUrl: './new-agency.component.html',
  styleUrls: ['./new-agency.component.less']
})
export class NewAgencyComponent implements OnInit {

  // 父级机构Id
  private parentId: string;
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

  constructor(private fb: FormBuilder, public http: HttpClient, private router: Router, public route: ActivatedRoute, private notification: NzNotificationService) { }

  ngOnInit() {
    this.parentId = this.route.snapshot.params['id'];
    this.validateForm = this.fb.group({
      parentId   :  this.parentId,
      name       :  null,
      enName     :  null,
      shortName  :  null,
      address    :  null,
      dutyPerson :  null,
      mobile     :  null,
      phone      :  null,
      zipCode    :  null,
      fax        :  null,
      remarks    :  null,
      type       :  null,
    });
  }

}
