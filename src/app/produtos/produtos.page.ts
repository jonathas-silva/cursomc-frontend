import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { DistinctSubscriber } from 'rxjs/internal/operators/distinct';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produtoDTO';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];
  categoria: string;

  constructor(
    public produtoService: ProdutoService,
    public router: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.categoria = params['categoria_id'];
    });
    console.log("Segue o parâmetro contido em 'categoria_id': " + this.categoria);

    this.produtoService.findByCategoria(this.categoria)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
        error => { });

  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  showDetail() {
    console.log('tentando abrir...');
    this.navCtrl.navigateForward('produto-detail');
  }

}

