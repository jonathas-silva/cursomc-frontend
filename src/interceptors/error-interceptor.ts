import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService,
        public alertCtrl: AlertController
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
                        case 401:
                            this.handle401();
                            break;

                        case 403:
                            this.handle403();
                            break;

                        default:
                            this.handleDefautError(errorObj);
                    }

                    return throwError(errorObj)
                })) as any;
    }
    handleDefautError(errorObj) {
        this.presentAlertDefaut(errorObj.error, errorObj.message, errorObj.status);
    }
    handle401() {
        this.presentAlert401();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async presentAlert401() {
        const alert = await this.alertCtrl.create({
            header: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            backdropDismiss: false,
            mode: "md",
            buttons: ['OK']
        });
        await alert.present();
    }

    async presentAlertDefaut(errorObj: string, message: string, errorStatus: string) {
        const alert = await this.alertCtrl.create({
            header: 'Erro ' + errorStatus + ': ' + errorObj,
            message: message,
            backdropDismiss: false,
            mode: "md",
            buttons: ['OK']
        });
        await alert.present();
    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
