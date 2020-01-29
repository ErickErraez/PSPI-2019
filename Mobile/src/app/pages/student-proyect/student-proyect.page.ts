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
    integrantes: any = [];
    proyectos: any = JSON.parse(localStorage.getItem('proyecto'));
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    proyecto: any = new Proyectos();
    proyectoSend: Proyectos = new Proyectos();


    constructor(private route: ActivatedRoute, private nav: NavController, private proyectService: ProyectService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.estado = this.route.snapshot.paramMap.get('estado');
        this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
        this.findById();
    }

    ngOnInit() {
        this.getIntegrantes();
    }

    openWork(item) {
        this.nav.navigateForward(`works/${item}`);
    }

    getIntegrantes() {
        this.proyectService.getUsersProyects(this.proyecto.idProyectos).subscribe(r => {
            let objeto: any = r;
            objeto = objeto.datos;
            this.integrantes = objeto;
        });
    }

    findById() {
        this.proyectService.getById(this.proyecto.idProyectos).subscribe(res => {
            const objeto: any = res;
            this.proyectoSend = objeto.datos;
        });
    }

    aceptarProyecto(state) {
        this.proyectoSend.created_at = new Date(this.proyectoSend.created_at).toISOString().slice(0, 19).replace('T', ' ');
        this.proyectoSend.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.proyectoSend.estado = state;
        this.proyectService.updateState(this.proyectoSend).subscribe(r => {
            this.nav.navigateRoot(['']);
        });
    }

    rechazarProyecto(state) {
        this.proyectoSend.created_at = new Date(this.proyectoSend.created_at).toISOString().slice(0, 19).replace('T', ' ');
        this.proyectoSend.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.proyectoSend.estado = state;
        this.proyectService.updateState(this.proyectoSend).subscribe(r => {
            this.nav.navigateRoot(['']);
        });
    }


}
