import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {ProyectService} from '../../services/proyect.service';
import {Proyectos} from '../../models/Proyectos';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    items = [];
    myProyects: any = [];
    pendings: any = [];
    proyectos: any;
    userProyect: any;
    show: any = false;
    showPending: any = false;

    constructor(public nav: NavController, private proyectoServices: ProyectService) {
        this.getUserProyect();
        this.getTutorProyect();
        this.getPendingProyect();
    }

    abrirEnlace(item, estado, rol) {
        this.nav.navigateForward(`student-proyect/${item}/${estado}/${rol}`);

    }

    doRefresh(event) {
        this.getUserProyect();
        this.getTutorProyect();
        this.getPendingProyect();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }


    getUserProyect() {
        if (this.usuario.rol == 2) {
            this.proyectoServices.getUserProyects(this.usuario.idUsuarios).subscribe(r => {
                const proyecto: any = r;
                this.validar(proyecto);
                localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
                this.proyectos = JSON.parse(localStorage.getItem('proyecto'));
            });
        }
    }

    getTutorProyect() {
        if (this.usuario.rol == 3) {
            this.proyectoServices.getTutorProyects(this.usuario.idUsuarios).subscribe(r => {
                const proyecto: any = r;
                this.validar(proyecto);
                localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
                this.proyectos = JSON.parse(localStorage.getItem('proyecto'));
            });
        }
    }

    getPendingProyect() {
        if (this.usuario.rol == 2) {
            this.proyectoServices.getUserPendingProyect(this.usuario.idUsuarios).subscribe(res => {
                let proyecto: any = res;
                proyecto = proyecto.datos;
                this.pendings = proyecto;
                this.showPendings(res);
                localStorage.setItem('proyectosPending', JSON.stringify(proyecto));
            });
        }
    }

    validar(id?) {
        if (id.datos.length == 0) {
            this.show = false;
        } else {
            this.show = true;
        }
    }

    showPendings(id?) {
        if (id.datos.length == 0) {
            this.showPending = false;
        } else {
            this.showPending = true;
        }
    }


}
