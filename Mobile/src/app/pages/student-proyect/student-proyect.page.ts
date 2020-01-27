import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ProyectService} from '../../services/proyect.service';

@Component({
    selector: 'app-student-proyect',
    templateUrl: './student-proyect.page.html',
    styleUrls: ['./student-proyect.page.scss'],
})
export class StudentProyectPage implements OnInit {

    id: string;
    estado: string;

    constructor(private route: ActivatedRoute, private nav: NavController, private proyectService: ProyectService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.estado = this.route.snapshot.paramMap.get('estado');
    }

    ngOnInit() {
        this.getProyect();
    }

    openWork(item) {
        this.nav.navigateForward(`works/${item}`);
    }

    getProyect() {
        this.proyectService.getProyectById(this.id).subscribe(r => {
            console.log(r);
        });
    }

}
