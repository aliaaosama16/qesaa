import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { NetworkService } from '../network/network.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private network: NetworkService,
    private util: UtilitiesService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.network.listenToNetwork();
        console.error(error);
        return throwError(error);
      })
    );
  }
}
