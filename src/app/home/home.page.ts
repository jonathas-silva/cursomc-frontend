import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, public navCtrl: NavController, public menu: MenuController) {

  }

  creds :CredenciaisDTO = {
    email: "",
    senha: ""
  };

  public login(){
    //O método push não existe mais desde o ionic 4.
    //De-se utilizar o método navigateForward com o endereço registrado no Router
    console.log(this.creds);
    this.navCtrl.navigateForward('categorias');
    //this.html.push('CategoriasPage');
    
    
    //this.router.navigate(['categorias']); //-> também funciona
    }

    ionViewWillEnter() {
      setTimeout(() => this.menu.swipeGesture(false),500);

      //aqui foi colocado 500ms de delay para ativação/desativação do swipeGesture devido
      //ao irritante erro Assert: cannot be animating
    }
    ionViewWillLeave(){
      setTimeout(() => this.menu.swipeGesture(true),500);
    }

}
