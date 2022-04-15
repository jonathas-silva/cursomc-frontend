import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                catchError((error, caught) => {

                    let errorObj = error;
                    if (errorObj.error) {
                        errorObj = errorObj.error;
                    }
                    if (!errorObj.status) {
                        errorObj = JSON.parse(errorObj);
                    }

                    console.log("Erro detectado pelo interceptor:");
                    console.log(errorObj);

                    switch (errorObj.status) {
                        case 403:
                            this.handle403();
                            break;
                    }

                    return throwError(errorObj)
                })) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};