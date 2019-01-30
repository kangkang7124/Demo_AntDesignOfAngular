import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InitService } from './services/init/init-service.service';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'index', redirectTo: '/index', pathMatch: 'full', data: {
      title: '亚士德混凝土后台管理'
    }
  },
  {
    path: 'login', component: LoginComponent, canActivate: [InitService], data: {
      title: '用户登录'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
