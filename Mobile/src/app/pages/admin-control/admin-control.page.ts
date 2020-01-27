import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ProyectService} from '../../services/proyect.service';
import {Categorias} from '../../models/Categorias';
import {ModalController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';

@Component({
    selector: 'app-admin-control',
    templateUrl: './admin-control.page.html',
    styleUrls: ['./admin-control.page.scss'],
})
export class AdminControlPage implements OnInit {

    show: any = {};
    categorias: any;
    categoria: Categorias = new Categorias();

    constructor(private adminService: AdminService, private proyectoServices: ProyectService, public modalController: ModalController) {
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

    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalPage,

            componentProps: {categoria: this.categoria}
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
        if (this.show.formularioSolicitud) {
            this.show.formularioSolicitud = true;
            this.adminService.updateConfiguraciones(this.show).subscribe(res => {
                console.log(res);
            });
        } else {
            this.show.formularioSolicitud = false;
            this.adminService.updateConfiguraciones(this.show).subscribe(res => {
                console.log(res);
            });
        }
    }

}
