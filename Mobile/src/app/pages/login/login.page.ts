import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Toast} from '@ionic-native/toast/ngx';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userName: string;
    password: string;
    tipoInput: any = 'password';
    validateLogin: boolean;

    constructor(private service: AuthService, private route: NavController, private toastr: ToastController, private platform: Platform) {
        this.platform.backButton.subscribeWithPriority(1, () => {
            navigator['app'].exitApp();
        });
    }

    ngOnInit() {
    }

    login(event) {
        if (event.which === 13 || event === 13) {
            this.validateLogin = false;

            this.userName = this.userName.toLocaleLowerCase();
            if (this.userName.search('@') === -1) {
                this.userName = this.userName + '@yavirac.edu.ec';
            }
            this.service.postPublic('oauth/token', {
                'client_id': 1,
                'client_secret': 'gCKtEi6W8KpXgWCv4sDSlkM6IErcQQLTuvW5j5yg',
                'grant_type': 'password',
                'username': this.userName,
                'password': this.password
            }).subscribe(
                response => {
                    localStorage.setItem('token', JSON.stringify(response['access_token']));
                    localStorage.setItem('isLoggedin', 'true');
                    this.service.get('usuarios/login?email=' + this.userName).subscribe(response2 => {
                        localStorage.setItem('user', JSON.stringify(response2));
                        this.presentToast('Logueado con Exito');
                        this.route.navigateRoot(['']);
                    });
                    this.validateLogin = false;
                },
                error => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('isLoggedin');
                    this.presentToast('Credenciales Incorrectas');
                    this.validateLogin = true;
                });
        }
    }

    async presentToast(mensaje) {
        const toast = await this.toastr.create({
            message: mensaje,
            cssClass: 'toast-scheme',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }
}
