import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FooterControllerModule } from '../index/footer-controller/footer-controller.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FooterControllerModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
