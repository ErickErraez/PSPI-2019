import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Toast} from '@ionic-native/toast/ngx';
import {LoadingController, NavController, Platform, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UserFormService} from '../../services/user-form.service';
import {error} from 'util';
import {Roles} from '../../models/Roles';
import {Usuarios} from '../../models/Usuarios';
import {ProyectService} from '../../services/proyect.service';
import {HttpHeaders} from '@angular/common/http';

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
    tipoInput: any = 'password';

    constructor(private service: AuthService, private route: NavController, private toastr: ToastController, private platform: Platform,
                private userService: UserFormService, private proyectoServices: ProyectService, public loadingController: LoadingController) {
        this.platform.backButton.subscribeWithPriority(1, () => {
            navigator['app'].exitApp();
        });
    }

    showPassword(item) {
        if (item === 'password') {
            this.tipoInput = 'text';
        }
        if (item === 'text') {
            this.tipoInput = 'password';
        }
    }

    ngOnInit() {
    }

    async showLoading() {
        const loading = await this.loadingController.create({
            duration: 2000,
            message: 'Please wait...',
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        await loading.present();
    }

    login(event) {
        if (event.which === 13 || event === 13) {
            this.validateLogin = false;
            this.userName = this.userName.toLocaleLowerCase();
            if (this.userName.search('@') === -1) {
                this.userName = this.userName + '@yavirac.edu.ec';
            }

            this.showLoading();
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
                        let objeto: any = {};
                        objeto = response2;
                        this.getEstudiante(objeto.usuario.id);
                        localStorage.setItem('user', JSON.stringify(response2));
                        this.presentToast('Logueado con Exito');
                        this.saveUser();
                    });
                    this.validateLogin = false;
                },
                err => {
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
        let objetoP: any = {};
        objetoP = this.user;
        this.service.get('estudiantes/' + this.user.id).subscribe(response => {
            let objeto: any = {};
            objeto = response;
            this.person.nivel = objeto.matricula.periodo_academico.id;
            if (this.user.role_id == 2) {
                this.person.rol = 2;
            }
            const array1 = this.user.name.split(' ');
            this.person.nombre1 = array1[1];
            this.person.apellido1 = array1[0];
            this.person.cedula = this.user.user_name;
            this.person.correo = this.user.email;
            this.person.password = this.password;
            this.userService.getUserByEmail(this.person.correo).subscribe(response2 => {
                let objeto2: any = {};
                objeto2 = response2;
                if (objeto2.ok) {
                    localStorage.setItem('usuario', JSON.stringify(objeto2.datos));
                    this.getPeriodo();
                    this.getUserProyect(objeto2.datos.idUsuarios);
                    this.route.navigateRoot(['']);
                } else {
                    this.userService.createUser(this.person).subscribe(res => {
                        objeto2 = res;
                        localStorage.setItem('usuario', JSON.stringify(objeto2.datos));
                        this.route.navigateRoot(['']);
                    }, er => {
                        alert(JSON.stringify(er));
                    });
                }
            }, erro => {
                alert(JSON.stringify(erro));
            });
        }, err => {
            alert(JSON.stringify(err));
        });
    }

    getPeriodo() {
        this.proyectoServices.getPeriodo().subscribe(res => {
            const periodo: any = res;
            localStorage.setItem('periodoActual', JSON.stringify(periodo.datos));
        });
    }

    getUserProyect(id) {
        this.proyectoServices.getUserProyects(id).subscribe(r => {
            const proyecto: any = r;
            localStorage.setItem('proyecto', JSON.stringify(proyecto.datos));
        });
    }

    getEstudiante(id) {

    }
}
