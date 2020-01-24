import {Component} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {ProyectService} from '../../services/proyect.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    items = [];
    myProyects: any = [];
    proyectos: any;
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    userProyect: any;
    show: any = false;

    constructor(public nav: NavController, private proyectoServices: ProyectService) {
        this.getUserProyect();
    }

    abrirEnlace(item, estado) {
        this.nav.navigateForward(`student-proyect/${item}`);

    }

    doRefresh(event) {
        this.getUserProyect();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }


    getUserProyect() {
        this.proyectoServices.getUserProyects(this.usuario.idUsuarios).subscribe(r => {
            const proyecto: any = r;
            this.validar(proyecto);
            localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
            this.proyectos = JSON.parse(localStorage.getItem('proyecto'));

        });
    }

    validar(id?) {
        if (id.datos.length == 0) {
            this.show = false;
        } else {
            this.show = true;
        }
    }

}
