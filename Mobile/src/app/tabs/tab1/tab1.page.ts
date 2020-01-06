import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    user: any = JSON.parse(localStorage.getItem('user'));
    passchange = false;
    tipoInput: any = 'password';
    repeatPassword: any;

    constructor(private service: AuthService, public alertController: AlertController, private route: NavController, public loadingController: LoadingController) {
        this.user = this.user.usuario;
    }

    cancelar() {
        this.passchange = false;
        this.user.password = '';
        this.repeatPassword = '';
    }

    showPassword(item) {
        if (item === 'password') {
            this.tipoInput = 'text';
        }
        if (item === 'text') {
            this.tipoInput = 'password';
        }
    }

    resetPassword() {
        this.showLoading();
        if (this.validatePasswords()) {
            this.service.update('users/reset_password', {user: this.user})
                .subscribe(
                    response => {
                        this.showAlert('Guardado con Exito', 'Se ha cambiado tu contraseña');
                    },
                    error => {
                        this.showAlert('!Oops algp ha salido mal', 'Oops!! Algo ha salido mal');
                    });
        } else {
            this.showAlert('!Oops algp ha salido mal', 'Las contraseñas no coinciden');
        }
    }


    async showLoading() {
        const loading = await this.loadingController.create({
            duration: 100,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        await loading.present();
    }

    async showAlert(title, mesagge) {
        const alert = await this.alertController.create({
            header: title,
            message: mesagge,
            buttons: ['OK']
        });
        await alert.present();
    }

    validatePasswords(): boolean {
        if (this.user.password !== this.repeatPassword) {
            return false;
        }
        return true;
    }

    cerrarSesion() {
        localStorage.clear();
        this.route.navigateRoot(['login']);
    }

}
