import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router, public navCtrl: NavController, public menu: MenuController) {

  }


  public login(){
    //O método push não existe mais desde o ionic 4.
    //De-se utilizar o método navigateForward com o endereço registrado no Router
    this.navCtrl.navigateForward('categorias');
    //this.html.push('CategoriasPage');
    
    
    //this.router.navigate(['categorias']); //-> também funciona
    }

    ionViewWillEnter() {
      this.menu.swipeGesture(false);
    }
    ionViewWillLeave(){
      this.menu.swipeGesture(true);
    }

}
