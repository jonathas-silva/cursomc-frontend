import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoriaDTO } from 'src/models/categoria.DTO';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response);
      }, 
      error => {
        console.log(error);
      }
      );
  }


}
