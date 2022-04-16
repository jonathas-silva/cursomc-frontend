import { Component } from '@angular/core';
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
    public auth: AuthService
  ) { }

  logoutMenu() {
    this.auth.logout();
    console.log("Logout");
  }
}
