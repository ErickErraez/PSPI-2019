import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {AdminService} from './admin.service';

@Injectable({
    providedIn: 'root'
})
export class ShowPageGuard implements CanActivate {

    show: any = {};

    constructor(private router: NavController, private adminService: AdminService) {
        this.adminService.getConfiguracion().subscribe(res => {
            this.show = res;
            this.show = this.show.datos;
        });
    }

    canActivate() {
        if (this.show.formularioSolicitud == true) {
            return true;
        } else {
            return false;
        }
    }

}
