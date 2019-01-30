import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  interval$: any;
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.userService.login(this.validateForm.value);
    }
  }

  constructor(
    private fb: FormBuilder,
    public msg: NzMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      loginName: ['cdmstestJiang', [Validators.required]],
      password: ['88888888', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
