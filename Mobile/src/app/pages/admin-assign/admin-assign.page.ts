import {Component, OnInit} from '@angular/core';
import {ProyectService} from '../../services/proyect.service';
import {UserFormService} from '../../services/user-form.service';
import {Proyectos} from '../../models/Proyectos';
import {AlertController, LoadingController} from '@ionic/angular';
import {AdminService} from '../../services/admin.service';
import {PeriodoAcademico} from '../../models/Periodo-Academico';

@Component({
    selector: 'app-admin-assign',
    templateUrl: './admin-assign.page.html',
    styleUrls: ['./admin-assign.page.scss'],
})
export class AdminAssignPage implements OnInit {

    valor: any = null;
    paralelo: any = null;
    docentes: any = [];
    periodo: PeriodoAcademico = new PeriodoAcademico();
    periodoActual: any = JSON.parse(localStorage.getItem('periodoActual'));
    proyecto: Proyectos = new Proyectos();
    proyectos: any;

    constructor(private userService: UserFormService, private proyectService: ProyectService,
                public loadingController: LoadingController, public alertController: AlertController,
                private adminService: AdminService) {
        this.periodo.nombre = this.periodoActual.nombre;
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
        if (this.valor != null && this.paralelo != null) {
            this.presentLoadingWithOptions();
            this.proyectService.getProyects(this.valor, this.paralelo).subscribe(r => {
                this.proyectos = r;
                this.proyectos = this.proyectos.datos;
                if (this.proyectos.length == 0) {
                    this.presentAlertPrompt('Aun no hay proyectos en este Nivel');
                } else {
                    for (let i = 0; i < this.proyectos.length; i++) {
                        this.proyecto.idProyectos = this.proyectos[i].idProyectos;
                        this.adminService.updateProyecto(this.proyecto).subscribe(res => {
                        });
                    }
                    this.presentAlertPrompt('Se ha asigando el tutor');
                    this.cancelarAsignacion();
                }
            });
        } else {
            this.presentAlertPrompt('Faltan datos necesarios');
        }
    }

    cancelarAsignacion() {
        this.valor = null;
        this.paralelo = null;
        this.proyecto = new Proyectos();
    }

    editarPeriodo() {
        this.showPeriodo('Crear Nuevo Periodo');

    }

    async showPeriodo(message) {
        const alert = await this.alertController.create({
            header: message,
            inputs: [
                {
                    name: 'periodo',
                    type: 'text',
                    placeholder: 'Ingrese el nuevo Periodo Academico'
                },
            ],
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
                        this.presentLoadingWithOptions();
                        this.periodo.nombre = data.periodo;
                        this.periodo.estado = 'Activo';
                        this.adminService.getPeriodos().subscribe(result => {
                            const periodos = result['datos'];
                            for (let i = 0; i < periodos.length; i++) {
                                periodos[i].estado = 'Inactivo';
                                this.adminService.updatePeriodo(periodos[i]).subscribe(res => {

                                }, err => {
                                    this.presentAlert('Algo ha salido Mal');
                                });
                            }
                            this.adminService.createPeriodo(this.periodo).subscribe(r => {
                                this.presentAlert('Periodo creado con exito');
                            }, e => {
                                this.presentAlert('Nose ha podido crear el periodo');
                            });
                        }, error => {
                            this.presentAlert('Algo ha salido Mal');
                        });
                    }
                }
            ]
        });

        await alert.present();
    }


    async presentAlert(mensaje) {
        const alert = await this.alertController.create({
            header: mensaje,
            buttons: [
                {
                    text: 'Ok',
                    handler: (data) => {

                    }
                }
            ]
        });

        await alert.present();
    }

}
