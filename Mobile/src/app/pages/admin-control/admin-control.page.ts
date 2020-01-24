import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {ProyectService} from '../../services/proyect.service';
import {Categorias} from '../../models/Categorias';

@Component({
    selector: 'app-admin-control',
    templateUrl: './admin-control.page.html',
    styleUrls: ['./admin-control.page.scss'],
})
export class AdminControlPage implements OnInit {

    show: any = {};
    categorias: any;
    categoria: Categorias = new Categorias();

    constructor(private adminService: AdminService, private proyectoServices: ProyectService) {
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

    estaSeleccionado(porVerificar): boolean {
        if (this.categoria == null) {
            return false;
        }
        return porVerificar.idCategorias === this.categoria.idCategorias;
    }

    onSelect(actual): void {
        this.categoria = actual;
    }

    verificar(){}


    changeStatus() {
        if (this.show.formularioSolicitud) {
            this.show.formularioSolicitud = false;
            this.adminService.updateConfiguraciones(this.show).subscribe(res => {
                console.log(res);
            });
        } else {
            this.show.formularioSolicitud = true;
            this.adminService.updateConfiguraciones(this.show).subscribe(res => {
                console.log(res);
            });
        }
    }

}
