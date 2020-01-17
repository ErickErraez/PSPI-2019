import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, Platform, ToastController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';
import {log} from 'util';
import {Proyectos} from '../../models/Proyectos';
import {UserFormService} from '../../services/user-form.service';
import {ProyectService} from '../../services/proyect.service';
import {UsuariosProyecto} from '../../models/Usuarios-Proyecto';

@Component({
    selector: 'app-user-form',
    templateUrl: './student-form.page.html',
    styleUrls: ['./student-form.page.scss'],
})
export class StudentFormPage implements OnInit {

    user: any = JSON.parse(localStorage.getItem('user'));
    proyecto: Proyectos = new Proyectos();
    usuario: any = JSON.parse(localStorage.getItem('usuario'));
    miembros = [];
    usuarioProyecto: UsuariosProyecto = new UsuariosProyecto();
    categorias = [];
    periodo: any;

    constructor(private route: NavController, private platform: Platform, public alertController: AlertController, private proyectoServices: ProyectService,
                public loadingController: LoadingController, private userService: UserFormService, private toastr: ToastController) {
        this.platform.backButton.subscribeWithPriority(1, () => {
            navigator['app'].exitApp();
        });
        this.getCategories();
        this.getPeriodo();
    }

    ngOnInit() {
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Agregar Miembro',
            inputs: [
                {
                    name: 'persona',
                    type: 'text',
                    placeholder: 'Placeholder 1',
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
                        console.log('Confirm Ok');
                        this.buscarPersona(data.persona);
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

    buscarPersona(email) {
        this.presentLoadingWithOptions();
        this.userService.getUserByEmail(email).subscribe(response => {
            let objeto: any = {};
            objeto = response;
            if (objeto.ok) {
                if (objeto.datos.idRol == 4) {
                    if (objeto.datos.correo != this.user.usuario.email) {
                        if (this.miembros.length == 0) {
                            this.miembros.push(objeto.datos);
                        } else {
                            for (let i = 0; i < this.miembros.length; i++) {
                                if (this.miembros[i].correo == email) {

                                } else {
                                    this.miembros.push(objeto.datos);
                                    console.log(this.miembros);
                                }
                            }
                        }
                    } else {
                        this.presentToast('Ya estas agregado');
                    }
                } else {
                    this.presentToast('No puedes agregar un profesor');
                }
            } else {
                this.presentToast('No existe el correo');
            }
        }, err => {
            this.presentToast('Algo ha salido mal');
        });
    }


    enviarPropuesta() {
        this.proyecto.estado = 'Pendiente';
        this.proyecto.nivel = this.usuario.nivel;
        this.userService.createForm(this.proyecto).subscribe(res => {
            this.presentLoadingWithOptions();
            this.presentToast('Registro Guardado con exito');
            let proyectFinal: any = res;
            proyectFinal = proyectFinal.proyecto;
            this.createUserProyect(proyectFinal.idProyectos);
        }, error => {
            console.log(error);
        });
    }

    createUserProyect(proyecto) {
        console.log(proyecto);
        this.usuarioProyecto.idProyecto = parseInt(proyecto);
        this.usuarioProyecto.idEstudiante = this.usuario.idUsuarios;
        this.proyectoServices.createUserProyects(this.usuarioProyecto).subscribe(res => {
            for (let i = 0; i < this.miembros.length; i++) {
                this.usuarioProyecto.idEstudiante = this.miembros[i].idUsuarios;
                this.proyectoServices.createUserProyects(this.usuarioProyecto).subscribe(resp => {
                    console.log(resp);
                });
            }
        });
    }

    getPeriodo() {
        this.proyectoServices.getPeriodo().subscribe(res => {
            const per: any = res;
            localStorage.setItem('periodoActual', JSON.stringify(per.datos));
            this.periodo = JSON.parse(localStorage.getItem('periodoActual'));
            this.proyecto.idPeriodo = this.periodo.idPeriodoAcademico;
        });
    }

    quitar(data) {
        // Filtramos el elemento para que quede fuera
        this.miembros = this.miembros.filter(s => s !== data);
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

    getCategories() {
        this.proyectoServices.getCategories().subscribe(res => {
            const categoria: any = res;
            this.categorias = categoria.datos;
        }, error => {
            this.presentToast('Algo ha salido mal');
        });
    }


}
