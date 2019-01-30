import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS, NZ_MODAL_CONFIG} from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { DefaultInterceptor } from './core/net/default.interceptor';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { DelonAuthModule } from '@delon/auth';
import { IndexModule } from './pages/index/index.module';
import { LoginModule } from './pages/login/login.module';
import { AlainThemeModule } from '@delon/theme';
import { DelonFormModule } from '@delon/form';

registerLocaleData(zh);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DelonAuthModule,
    IndexModule,
    LoginModule,
    AlainThemeModule.forRoot(),
    DelonFormModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
    // 指定认证风格对应的HTTP拦截器
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: NZ_MODAL_CONFIG, useValue: { autoBodyPadding: false }},
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    LocalStorageService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
