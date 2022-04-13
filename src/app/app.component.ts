import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //isso é um conjunto chave valor
  public appPages = [
    { title: 'Profile', component: 'profile', icon: 'person-circle' },
    { title: 'Categorias', component: 'categorias', icon: 'pricetag' }
  ];

  constructor() { }
}
