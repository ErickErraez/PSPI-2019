import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ProyectService} from '../../services/proyect.service';
import {Categorias} from '../../models/Categorias';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';
import {Notas} from '../../models/Notas';

@Component({
    selector: 'app-admin-control',
    templateUrl: './admin-control.page.html',
    styleUrls: ['./admin-control.page.scss'],
})
export class AdminControlPage implements OnInit {

    show: any = {};
    categorias: any;
    stateWork: any = '';
    fecha: any;
    works: any = [];
    nota: Notas = new Notas();
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    categoria: Categorias = new Categorias();

    constructor(private adminService: AdminService, private proyectoServices: ProyectService, public alertController: AlertController,
                public modalController: ModalController, public loadingController: LoadingController) {
        this.adminService.getConfiguracion().subscribe(res => {
            this.show = res;
            this.show = this.show.datos;
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

    showNew(state) {
        this.stateWork = state;
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

    createWork() {
        if (this.nota.fechaLimite !== undefined || this.nota.idTipoEvaluacion !== undefined) {
            this.showLoading();
            this.nota.fechaLimite = this.nota.fechaLimite.replace('T', ' ');
            this.nota.fechaLimite = this.nota.fechaLimite.substr(0, 19);
            this.proyectoServices.getTutorUserProyects(this.usuario.idUsuarios).subscribe(res => {
                let result: any = res;
                result = result.datos;
                for (let i = 0; i < result.length; i++) {
                    this.nota.idUsuariosProyectos = result[i].idUsuariosProyectos;
                    this.proyectoServices.createWork(this.nota).subscribe(resp => {
                        this.presentAlertPrompt('Se ha creado la tarea');
                    }, err => {
                        this.presentAlertPrompt('Algo ha salido mal');
                    });
                }
            }, error => {
                this.presentAlertPrompt('Algo ha salido mal');
            });
        } else {
            this.presentAlertPrompt('Debes llenar todos los campos');
        }
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
