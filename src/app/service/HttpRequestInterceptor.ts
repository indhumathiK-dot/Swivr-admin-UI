import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {Router} from '@angular/router';
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const currentUser = localStorage.getItem('login');
    // if(currentUser === 'true') {
    // } else {
    //   this.router.navigate(['/login']);
    // }

    return next.handle(request)
      .pipe(catchError((err: any) => {
        console.log('this log isn');

        return new Observable<HttpEvent<any>>();
      }));
  }


}
