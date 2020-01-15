import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, Platform, ToastController} from '@ionic/angular';
import {ModalPage} from '../modal/modal.page';
import {log} from 'util';
import {Proyectos} from '../../models/Proyectos';
import {UserFormService} from '../../services/user-form.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './student-form.page.html',
    styleUrls: ['./student-form.page.scss'],
})
export class StudentFormPage implements OnInit {

    user: any = JSON.parse(localStorage.getItem('user'));
    proyecto: Proyectos = new Proyectos();
    miembros = [];

    constructor(private route: NavController, private platform: Platform, public alertController: AlertController,
                public loadingController: LoadingController, private userService: UserFormService) {
        this.platform.backButton.subscribeWithPriority(1, () => {
            navigator['app'].exitApp();
        });
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
        this.miembros.push(email);
    }


    enviarPropuesta() {
        this.proyecto.estado = 'Pendiente';
        this.userService.createForm(this.proyecto).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error);
        });
    }

}
