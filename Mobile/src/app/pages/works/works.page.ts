import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController, LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {Adjuntos} from '../../models/Adjuntos';
import {ProyectService} from '../../services/proyect.service';
import {Notas} from '../../models/Notas';
import {DomSanitizer} from '@angular/platform-browser';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import * as moment from 'moment';
import {Email} from '../../models/Email';


@Component({
    selector: 'app-works',
    templateUrl: './works.page.html',
    styleUrls: ['./works.page.scss'],
})
export class WorksPage implements OnInit {

    id: string;
    mail: string;
    email: Email = new Email();
    rol: string;
    adjunto: Adjuntos = new Adjuntos();
    elements: any = [];
    nota: Notas = new Notas();
    adjuntos: any = [];
    url: any;
    usuario: any = JSON.parse(localStorage.getItem('usuario'));

    constructor(public browser: InAppBrowser, public platform: Platform, private domSanitizer: DomSanitizer, private route: ActivatedRoute,
                public loadingController: LoadingController, private nav: NavController, private proyectService: ProyectService,
                public alertController: AlertController, private toastr: ToastController) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.rol = this.route.snapshot.paramMap.get('rol');
        this.mail = this.route.snapshot.paramMap.get('email');
    }

    ngOnInit() {
        this.getData();
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

    async presentLoadingWithOptions() {
        const loading = await this.loadingController.create({
            duration: 100,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }

    CodificarArchivo(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[i];
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.adjunto.nombre = file.name;
                    this.adjunto.tipo = file.type;
                    this.adjunto.contenido = reader.result.toString().split(',')[1];
                    this.adjunto.idNotas = parseInt(this.id);
                    this.elements.push(this.adjunto);
                    this.adjunto = new Adjuntos();
                };
            }
        }
    }

    getData() {
        this.proyectService.getNotas(this.id).subscribe(r => {
            this.nota = r['datos'];
            const fechaLimite = new Date(this.nota.fechaLimite).toISOString().slice(0, 19).replace('T', ' ');
            this.nota.fechaLimite = fechaLimite;
            if (this.nota.fechaEntrega != null) {
                const fechaEntrega = new Date(this.nota.fechaEntrega).toISOString().slice(0, 19).replace('T', ' ');
                this.nota.fechaEntrega = fechaEntrega;

                const fecha1: any = moment(this.nota.fechaEntrega);
                const fecha2: any = moment(this.nota.fechaLimite);
                console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
                console.log(fecha1._locale._months);
            }
        }, error => {
            console.log(error);
        });
        this.proyectService.getAdjuntosByNotas(this.id).subscribe(re => {
            this.adjuntos = re['datos'];
        });
    }

    typeClass() {
        if (this.nota.nota > 50) {
            return true;
        } else {
            return false;
        }
    }

    enviarTarea() {
        this.presentLoadingWithOptions();
        const update = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.nota.fechaEntrega = update;
        if (this.elements.length !== 0) {
            this.proyectService.actualizarNota(this.nota).subscribe(res => {
                for (let i = 0; i < this.elements.length; i++) {
                    this.proyectService.createAdjuntos(this.elements[i]).subscribe(r => {

                    });
                }
                this.presentToast('Enviado con exito');
                this.email.asunto = 'Envio de tarea';
                this.email.mensaje = 'Se ha enviado tu tarea para ser calificada';
                this.email.email = this.mail;
                this.proyectService.sendEmail(this.email).subscribe(r => {
                    console.log(r);
                }, err => {
                    console.log(err);
                });
            });
        } else {
            this.presentToast('Debes adjuntar un archivo');
        }
    }

    calificar(titulo) {
        this.presentAlertPrompt(titulo);
    }

    async presentAlertPrompt(titulo) {
        const alert = await this.alertController.create({
            header: titulo,
            inputs: [
                {
                    name: 'nota',
                    type: 'number',
                    min: 0,
                    max: 100,
                    placeholder: 'Ingrese Calificación',
                },
                {
                    name: 'observacion',
                    type: 'text',
                    placeholder: 'Ingrese Observación',
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
                        this.presentLoadingWithOptions();
                        this.nota.nota = data.nota;
                        this.nota.observaciones = data.observacion;
                        this.nota.calificador = this.usuario.nombre1 + ' ' + this.usuario.apellido1;
                        this.proyectService.actualizarNota(this.nota).subscribe(res => {
                            this.presentToast('Se ha enviado tu calificacion');
                            this.email.asunto = 'Calificacion de Tarea';
                            this.email.mensaje = 'Se ha calificado la tarea ingresa al sistema para ver la nota';
                            this.email.email = this.mail;
                            this.proyectService.sendEmail(this.email).subscribe(r => {
                                console.log(r);
                            }, err => {
                                console.log(err);
                            });
                        }, error => {
                            this.presentToast('Algo ha salido mal');
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    public download(nombreArchivo, tipoarchivo, archivoAdjunto) {

        const url = 'data:' + tipoarchivo + ';base64,' + archivoAdjunto;
        const options: InAppBrowserOptions = {
            zoom: 'yes'
        };
        this.browser.create(url, '_system');
    }

}
