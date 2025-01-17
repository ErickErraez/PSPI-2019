import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
