import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ProyectService} from '../../services/proyect.service';
import {Categorias} from '../../models/Categorias';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';

@Component({
    selector: 'app-admin-control',
    templateUrl: './admin-control.page.html',
    styleUrls: ['./admin-control.page.scss'],
})
export class AdminControlPage implements OnInit {

    show: any = {};
    categorias: any;
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    categoria: Categorias = new Categorias();

    constructor(private adminService: AdminService, private proyectoServices: ProyectService, public alertController: AlertController,
                public modalController: ModalController, public loadingController: LoadingController) {
        this.adminService.getConfiguracion().subscribe(res => {
            this.show = res;
            this.show = this.show.datos;
            console.log(this.show);
        });
    }

    ngOnInit() {
        this.getCategorias();
    }

    getCategorias() {
        this.proyectoServices.getCategories().subscribe(res => {
            this.categorias = res;
            this.categorias = this.categorias.datos;
        });
    }

    async presentModal(item?) {
        const modal = await this.modalController.create({
            component: ModalPage,
            componentProps: {categoria: item}
        });

        modal.onDidDismiss().then(r => {
            this.getCategorias();
        });


        return await modal.present();
    }

    estaSeleccionado(porVerificar): boolean {
        if (this.categoria == null) {
            return false;
        }
        return porVerificar.idCategorias === this.categoria.idCategorias;
    }

    onSelect(actual): void {
        this.categoria = actual;
    }


    changeStatus(variable) {
        this.show.formularioSolicitud = variable;
        this.adminService.updateConfiguraciones(this.show).subscribe(res => {
            console.log(res);
        });

    }

    deleteCategory() {
        this.showLoading();
        this.adminService.deleteCategory(this.categoria).subscribe(r => {
            this.getCategorias();
            this.presentAlertPrompt('Eliminado con Exito');
        });
    }

    async showLoading() {
        const loading = await this.loadingController.create({
            duration: 50,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        await loading.present();
    }

    async presentAlertPrompt(mensaje) {
        const alert = await this.alertController.create({
            header: mensaje,
            buttons: [{
                text: 'Ok',
                handler: (data) => {

                }
            }
            ]
        });

        await alert.present();
    }

}
