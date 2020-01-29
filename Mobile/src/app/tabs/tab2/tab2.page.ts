import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {ProyectService} from '../../services/proyect.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    items = [];
    myProyects: any = [];
    proyectos: any;
    userProyect: any;
    show: any = false;

    constructor(public nav: NavController, private proyectoServices: ProyectService) {
        this.getUserProyect();
        this.getTutorProyect();
    }

    abrirEnlace(item, estado) {
        this.nav.navigateForward(`student-proyect/${item}/${estado}`);

    }

    doRefresh(event) {
        this.getUserProyect();
        this.getTutorProyect();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }


    getUserProyect() {
        if (this.usuario.rol === 2) {
            this.proyectoServices.getUserProyects(this.usuario.idUsuarios).subscribe(r => {
                const proyecto: any = r;
                this.validar(proyecto);
                localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
                this.proyectos = JSON.parse(localStorage.getItem('proyecto'));

            });
        }
    }

    getTutorProyect() {
        if (this.usuario.rol === 3) {
            this.proyectoServices.getTutorProyects(this.usuario.idUsuarios).subscribe(r => {
                const proyecto: any = r;
                this.validar(proyecto);
                localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
                this.proyectos = JSON.parse(localStorage.getItem('proyecto'));
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


}
