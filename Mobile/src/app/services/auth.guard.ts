import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
