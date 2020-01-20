import {Component, OnInit} from '@angular/core';
import {ProyectService} from '../../services/proyect.service';
import {UserFormService} from '../../services/user-form.service';
import {Proyectos} from '../../models/Proyectos';

@Component({
    selector: 'app-admin-assign',
    templateUrl: './admin-assign.page.html',
    styleUrls: ['./admin-assign.page.scss'],
})
export class AdminAssignPage implements OnInit {

    valor: any = null;
    docentes: any = [];
    proyecto: Proyectos = new Proyectos();

    constructor(private userService: UserFormService) {
        this.userService.getDocentes().subscribe(r => {
            let objeto: any = {};
            objeto = r;
            this.docentes = objeto.datos;
        });
    }

    ngOnInit() {

    }

}
