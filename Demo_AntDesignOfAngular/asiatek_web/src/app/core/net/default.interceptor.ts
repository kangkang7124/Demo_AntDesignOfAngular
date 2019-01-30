import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { environment } from '../../../environments/environment';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '访问内容不存在！',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  3011: '登录校验失败，请重新登录!'
};

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService
  ) {}

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: HttpResponseBase) {
    if (ev.status < 300) {
      return;
    }
    const errortext = CODEMESSAGE[ev.status] || ev.statusText;
    this.injector
      .get(NzNotificationService)
      .error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
  }

  private handleData(ev: HttpResponseBase): Observable<any> {
    this.checkStatus(ev);
    if (ev.headers !== undefined) {
      const headers = ev.headers;
      if (headers.get('Authorization') !== null) {
        this.tokenService.set({ token: headers.get('Authorization') });
      }
    }
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.status !== 0) {
            this.msg.error(body.msg);
            return throwError({});
          } else {
            if (body.response.code === 3011) {
              this.goTo('/login');
            }
            // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
            return of(
              new HttpResponse(Object.assign(event, { body: body.response }))
            );
            // 或者依然保持完整的格式
            return of(event);
          }
        }
        break;
      case 401:
        this.tokenService.clear();
        this.goTo('/login');
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/error/${ev.status}`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn(
            '未可知错误，大部分是由于后端不支持CORS或无效配置引起',
            ev
          );
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (
      !url.startsWith('https://') &&
      !url.startsWith('http://') &&
      !url.startsWith('.')
    ) {
      url = environment.SERVER_URL + url;
    }
    let token = this.tokenService.get<JWTTokenModel>(JWTTokenModel).token;
    if (token === null || token === undefined) {
      token = '';
    }
    const newReq = req.clone({
      url: url,
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
}
