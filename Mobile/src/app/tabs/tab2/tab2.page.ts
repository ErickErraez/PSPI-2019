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
    proyecto: any = JSON.parse(localStorage.getItem('proyecto'));
    userProyect: any;

    constructor(public nav: NavController, private proyectServices: ProyectService) {
        this.getData();
    }

    abrirEnlace(item) {
        this.nav.navigateForward(`student-proyect/${item}`);

    }

    getData() {
        this.proyectServices.getUsersProyects(this.proyecto.idProyecto).subscribe(res => {
            this.userProyect = res;

        });
    }

}
