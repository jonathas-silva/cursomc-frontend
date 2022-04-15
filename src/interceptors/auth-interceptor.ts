import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { StorageService } from 'src/services/storage.service';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService

    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length; //tamanho da string da base URL
        let requestToAPI = request.url.substring(0, N) == API_CONFIG.baseUrl;


        if (localUser && requestToAPI) {
            const authReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer Bearer ' + localUser.token)
            });
            return next.handle(authReq);
        } else {
            return next.handle(request);
        }


    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true,
};