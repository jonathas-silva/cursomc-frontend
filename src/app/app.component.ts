import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //isso é um conjunto chave valor
  public appPages = [
    {
      title: 'Home', component: 'home', icon: 'home-outline'
    }
  ]; 

  constructor() {}
}
