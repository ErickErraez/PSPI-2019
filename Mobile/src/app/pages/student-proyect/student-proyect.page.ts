import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ProyectService} from '../../services/proyect.service';
import {Proyectos} from '../../models/Proyectos';

@Component({
    selector: 'app-student-proyect',
    templateUrl: './student-proyect.page.html',
    styleUrls: ['./student-proyect.page.scss'],
})
export class StudentProyectPage implements OnInit {

    id: string;
    estado: string;
    proyectos: any = JSON.parse(localStorage.getItem('proyecto'));
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    proyecto: any = new Proyectos();


    constructor(private route: ActivatedRoute, private nav: NavController, private proyectService: ProyectService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.estado = this.route.snapshot.paramMap.get('estado');
        this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
        console.log(this.proyecto);
    }

    ngOnInit() {
    }

    openWork(item) {
        this.nav.navigateForward(`works/${item}`);
    }


}
