import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {AdminService} from './admin.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    show: any = {};

    constructor(private router: NavController) {

    }

    canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigateRoot(['/login']);
        return false;
    }


}
