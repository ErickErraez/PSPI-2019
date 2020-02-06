import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {ProyectService} from '../../services/proyect.service';
import {Proyectos} from '../../models/Proyectos';
import {UserFormService} from '../../services/user-form.service';

@Component({
    selector: 'app-student-proyect',
    templateUrl: './student-proyect.page.html',
    styleUrls: ['./student-proyect.page.scss'],
})
export class StudentProyectPage implements OnInit {

    id: string;
    estado: string;
    periodo: any;
    rol: string;
    integrantes: any = [];
    categorias = [];
    proyectos: any = JSON.parse(localStorage.getItem('proyecto'));
    proyectosPending: any = JSON.parse(localStorage.getItem('proyectosPending'));
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    proyecto: any = new Proyectos();
    proyectoSend: Proyectos = new Proyectos();
    works: any = [];


    constructor(public loadingController: LoadingController, private route: ActivatedRoute, public alertController: AlertController, private nav: NavController,
                private proyectService: ProyectService, private proyectoServices: ProyectService, private toastr: ToastController) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.estado = this.route.snapshot.paramMap.get('estado');
        this.rol = this.route.snapshot.paramMap.get('rol');
        this.getCategories();
        this.getPeriodo();
        this.getWorks();
        if (this.proyectos.length !== 0) {
            this.proyecto = this.proyectos.find(proyect => proyect.idProyectos === parseInt(this.id));
            if (this.usuario.rol == 3) {
                this.findById(this.proyecto.idProyectos);
            }
            if (this.usuario.rol == 2) {
                console.log(this.proyectos);
                this.proyecto = this.proyectos.find(proyect => proyect.idProyecto === parseInt(this.id));
                if (this.estado == 'Aceptado') {
                    this.findById(this.proyecto.idProyecto);
                } else {
                    this.getProyecto(this.proyecto.idProyecto);
                }
            }
        } else {
            if (this.usuario.rol == 2) {
                this.proyecto = this.proyectosPending.find(proyect => proyect.idProyecto === parseInt(this.id));
                this.getProyecto(this.proyecto.idProyecto);
            }
        }
    }

    ngOnInit() {
        // tslint:disable-next-line:radix
        if (parseInt(this.rol) == 2) {
            this.getIntegrantes(this.proyecto.idProyecto);
        }
        // tslint:disable-next-line:radix
        if (parseInt(this.rol) == 3) {
            this.getIntegrantes(this.proyecto.idProyectos);
        }
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

    getProyecto(id?) {
        this.proyectoServices.getById(id).subscribe(res => {
            let data: any = res;
            data = data.datos;
            this.proyecto = data;
        });
    }

    actualizar() {
        if (this.proyecto.estado == 'Rechazado') {
            this.proyecto.estado = 'Pendiente';
        }
        this.proyectoServices.actualizarProyecto(this.proyecto).subscribe(res => {
            this.presentLoadingWithOptions();
            this.presentAlertPrompt();
        }, error => {

        });
    }

    openWork(item) {
        this.nav.navigateForward(`works/${item}`);
    }

    getIntegrantes(id) {
        this.proyectService.getUsersProyects(id).subscribe(r => {
            let objeto: any = r;
            objeto = objeto.datos;
            this.integrantes = objeto;
        });
    }

    findById(id) {
        this.proyectService.getById(id).subscribe(res => {
            const objeto: any = res;
            this.proyectoSend = objeto.datos;
        });
    }

    aceptarProyecto(state, observacion) {
        const update = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.proyectoSend.updated_at = update;
        this.proyectoSend.estado = state;
        this.proyectoSend.observaciones = observacion;
        this.proyectService.updateState(this.proyectoSend).subscribe(r => {
            this.nav.navigateRoot(['']);
        });
    }

    rechazarProyecto(state, observacion) {
        const update = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.proyectoSend.updated_at = update;
        this.proyectoSend.estado = state;
        this.proyectoSend.observaciones = observacion;
        this.proyectService.updateState(this.proyectoSend).subscribe(r => {
            this.nav.navigateRoot(['']);
        });
    }

    async presentToast(message) {
        const toast = await this.toastr.create({
            message: message,
            cssClass: 'toast-scheme',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }

    getPeriodo() {
        this.proyectoServices.getPeriodo().subscribe(res => {
            const per: any = res;
            localStorage.setItem('periodoActual', JSON.stringify(per.datos));
            this.periodo = JSON.parse(localStorage.getItem('periodoActual'));
            this.proyecto.idPeriodo = this.periodo.idPeriodoAcademico;
        });
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Datos Actualizados',
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
                        this.nav.navigateRoot(['']);
                    }
                }
            ]
        });

        await alert.present();
    }

    async createObservaciones(estado) {
        const alert = await this.alertController.create({
            header: 'Escribir Observacion',
            inputs: [
                {
                    name: 'observacion',
                    type: 'text',
                    placeholder: 'Ingrese Usuario',
                }
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
                        if (data.observacion !== '') {
                            if (estado == 'Aceptado') {
                                this.aceptarProyecto(estado, data.observacion);
                            } else {
                                this.rechazarProyecto(estado, data.observacion);
                            }
                        } else {
                            this.presentToast('Error Debes escribir una observacion');
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    getCategories() {
        this.proyectoServices.getCategories().subscribe(res => {
            const categoria: any = res;
            this.categorias = categoria.datos;
        }, error => {
            this.presentToast('Algo ha salido mal');
        });
    }

    getWorks() {
        if (this.usuario.rol == 2) {
            this.proyectoServices.getUserProyectWorks(this.usuario.idUsuarios).subscribe(res => {
                const result: any = res;
                this.works = result.datos;
            }, err => {
                alert(JSON.stringify(err));
            });

        } else if (this.usuario.rol == 3) {
            this.proyectoServices.getTeacherProyectWorks(this.usuario.idUsuarios).subscribe(res => {
                const result: any = res;
                this.works = result.datos;
            }, err => {
                alert(JSON.stringify(err));
            });
        }
    }


}
