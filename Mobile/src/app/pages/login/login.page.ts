import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Toast} from '@ionic-native/toast/ngx';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UserFormService} from '../../services/user-form.service';
import {error} from 'util';
import {Roles} from '../../models/Roles';
import {Usuarios} from '../../models/Usuarios';
import {ProyectService} from '../../services/proyect.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userName: string;
    person: Usuarios = new Usuarios();
    roles: Roles = new Roles();
    password: string;
    typeInput: any = 'password';
    validateLogin: boolean;
    user: any;

    constructor(private service: AuthService, private route: NavController, private toastr: ToastController, private platform: Platform,
                private userService: UserFormService, private proyectoServices: ProyectService) {
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
                client_id: 1,
                client_secret: 'gCKtEi6W8KpXgWCv4sDSlkM6IErcQQLTuvW5j5yg',
                grant_type: 'password',
                username: this.userName,
                password: this.password
            }).subscribe(
                response => {
                    localStorage.setItem('token', JSON.stringify(response['access_token']));
                    localStorage.setItem('isLoggedin', 'true');
                    this.service.get('usuarios/login?email=' + this.userName).subscribe(response2 => {
                        localStorage.setItem('user', JSON.stringify(response2));
                        this.presentToast('Logueado con Exito');
                        this.saveUser();
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

    async presentToast(message) {
        const toast = await this.toastr.create({
            message: message,
            cssClass: 'toast-scheme',
            position: 'top',
            duration: 2000
        });
        toast.present();
    }

    saveUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.user = this.user.usuario;
        if (this.user.role_id == 2) {
            this.person.idRol = 4;
        }
        const array1 = this.user.name.split(' ');
        this.person.nombre = array1[1];
        this.person.apellido = array1[0];
        this.person.cedula = this.user.user_name;
        this.person.correo = this.user.email;
        this.userService.getUserByEmail(this.person.correo).subscribe(response => {
            let objeto: any = {};
            objeto = response;
            if (objeto.ok) {
                this.getPeriodo();
            } else {
                this.userService.createUser(this.person).subscribe(res => {
                    console.log('creado');
                }, er => {
                    console.log(er);
                });
            }
        }, err => {

        });
    }

    getPeriodo() {
        this.proyectoServices.getPeriodo().subscribe(res => {
            const periodo: any = res;
            localStorage.setItem('periodo', JSON.stringify(periodo.datos));
        });
    }
}
