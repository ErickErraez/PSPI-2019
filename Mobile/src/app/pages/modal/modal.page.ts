import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams} from '@ionic/angular';
import {Categorias} from '../../models/Categorias';
import {AdminService} from '../../services/admin.service';
import {error} from 'util';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

    categoria: any;
    nombre: any;

    constructor(public modalController: ModalController, private navParams: NavParams, private adminService: AdminService,
                public alertController: AlertController, public loadingController: LoadingController) {
        this.categoria = navParams.get('categoria');
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    actualizarCategoria() {
        this.showLoading();
        this.categoria.created_at = new Date(this.categoria.created_at).toISOString().slice(0, 19).replace('T', ' ');
        this.categoria.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.adminService.updateCategory(this.categoria).subscribe(r => {
            this.presentAlertPrompt('Actualizado con exito');
        });
    }

    async showLoading() {
        const loading = await this.loadingController.create({
            duration: 20,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        await loading.present();
    }

    crearCategoria() {
        this.showLoading();
        this.categoria = new Categorias();
        this.categoria.nombre = this.nombre;
        this.categoria.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.categoria.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.adminService.createCategory(this.categoria).subscribe(r => {
            this.presentAlertPrompt('Guardado con Exito');
        }, error1 => {
            this.presentAlertPrompt('Ha ocurrido un error');
        });
    }

    async presentAlertPrompt(message) {
        const alert = await this.alertController.create({
            header: message,
            buttons: [{
                text: 'Ok',
                handler: (data) => {
                    this.dismiss();
                }
            }
            ]
        });

        await alert.present();
    }

    actualizarFecha() {
        this.showLoading();
        this.adminService.updateDate(this.categoria).subscribe(res => {
            this.presentAlertPrompt('Se ha actualizado la fecha');
        }, err => {
            this.presentAlertPrompt('Ha ocurrido un error');
        });
    }

}
