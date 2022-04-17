import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from 'src/models/fieldmessage';

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

                        case 422:
                            this.handle422(errorObj);
                            break;

                        default:
                            this.handleDefautError(errorObj);
                    }

                    return throwError(errorObj)
                })) as any;
    }
    handle422(errorObj) {
        this.presentAlert422(errorObj);
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

    async presentAlert422(errorObj) {
        const alert = await this.alertCtrl.create({
            header: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            backdropDismiss: false,
            mode: "md",
            buttons: ['OK']
        });

        await alert.present();
    }
    listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (var i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
