import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public toastController: ToastController
  ) {

  }

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  public login() {
    //O método push não existe mais desde o ionic 4.
    //De-se utilizar o método navigateForward com o endereço registrado no Router
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('categorias');
      },
        error => { });

    //this.html.push('CategoriasPage');


    //this.router.navigate(['categorias']); //-> também funciona
  }

  public signup() {
    this.navCtrl.navigateForward('signup');
  }

  ionViewWillEnter() {
    setTimeout(() => this.menu.swipeGesture(false), 500);
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('categorias');
        this.refreshTokenToast();
      });

    //aqui foi colocado 500ms de delay para ativação/desativação do swipeGesture devido
    //ao irritante erro Assert: cannot be animating
  }
  ionViewWillLeave() {
    setTimeout(() => this.menu.swipeGesture(true), 500);
  }

  async refreshTokenToast() {
    const toast = await this.toastController.create({
      message: 'Usuário já logado!',
      duration: 3000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

}
