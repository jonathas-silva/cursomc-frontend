import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { API_CONFIG } from 'src/config/api.config';
import { CategoriaDTO } from 'src/models/categoria.DTO';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;


  constructor(
    public categoriaService: CategoriaService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
        error => { });
  }

  showProdutos(categoria_id: string) {

    //maneira interessante de passar parâmetros através de páginas
    let extras: NavigationExtras = {
      queryParams: {
        categoria_id: categoria_id
      }
    };

    //passando parâmetro de uma página para outra
    this.navCtrl.navigateForward('produtos', extras);
  }

}
