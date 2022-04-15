import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(
    public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageifExists();
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.navigateRoot('home');
              this.errorToast();
            }
          });
    } else {
      this.navCtrl.navigateRoot('home');
      this.errorToast();
    }
  }

  getImageifExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
        error => { }
      );
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Usuário Não autorizado. Faça login novamente!',
      duration: 5000,
      position: 'top',
      color: 'warning'
    });
    toast.present();
  }



}
