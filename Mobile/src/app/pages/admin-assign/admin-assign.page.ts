import {Component, OnInit} from '@angular/core';
import {ProyectService} from '../../services/proyect.service';
import {UserFormService} from '../../services/user-form.service';
import {Proyectos} from '../../models/Proyectos';
import {AlertController, LoadingController} from '@ionic/angular';
import {AdminService} from '../../services/admin.service';

@Component({
    selector: 'app-admin-assign',
    templateUrl: './admin-assign.page.html',
    styleUrls: ['./admin-assign.page.scss'],
})
export class AdminAssignPage implements OnInit {

    valor: any = null;
    docentes: any = [];
    proyecto: Proyectos = new Proyectos();
    proyectos: any;

    constructor(private userService: UserFormService, private proyectService: ProyectService,
                public loadingController: LoadingController, public alertController: AlertController,
                private adminService: AdminService) {

        this.userService.getDocentes().subscribe(r => {
            let objeto: any = {};
            objeto = r;
            this.docentes = objeto.datos;
        });
    }

    ngOnInit() {

    }

    async presentAlertPrompt(message) {
        const alert = await this.alertController.create({
            header: message,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        console.log('Confirm OK');
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentLoadingWithOptions() {
        const loading = await this.loadingController.create({
            duration: 100,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }

    asignarTutores() {
        this.getProyectos();
    }


    getProyectos() {
        if (this.valor != null) {
            this.proyectService.getProyects(this.valor).subscribe(r => {
                this.proyectos = r;
                this.proyectos = this.proyectos.datos;
                if (this.proyectos.length == 0) {
                    this.presentAlertPrompt('Aun no hay proyectos en este Nivel');
                } else {
                    for (let i = 0; i < this.proyectos.length; i++) {
                        this.proyecto.idProyectos = this.proyectos[i].idProyectos;
                        this.adminService.updateProyecto(this.proyecto).subscribe(res => {
                            this.presentLoadingWithOptions();
                            this.presentAlertPrompt('Se ha asigando el tutor');
                            this.cancelarAsignacion();
                        });
                    }
                }
            });
        }
    }

    cancelarAsignacion() {
        this.valor = null;
        this.proyecto = new Proyectos();
    }

}
