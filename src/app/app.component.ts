import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //isso é um conjunto chave valor
  public appPages = [
    { title: 'Profile', component: 'profile', icon: 'person-circle' },
    { title: 'Categorias', component: 'categorias', icon: 'pricetag' },
    { title: 'Logout', component: '', icon: 'log-out' }
  ];

  constructor(
    public auth: AuthService,
    public navCtrl: NavController
  ) { }


  openPage(page: { title: string, component: string, icon: string }) {
    console.log(page.component);
    if (page.title == "Logout") {
      this.auth.logout();
      console.log("Logout");
      this.navCtrl.navigateRoot('home');
    } else {
      this.navCtrl.navigateForward(page.component);
    }
  }
}
