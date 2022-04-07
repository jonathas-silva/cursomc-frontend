import { Component, OnInit } from '@angular/core';
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


  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      }, 
      error => {});
  }


}
