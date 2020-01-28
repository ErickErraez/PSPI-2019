import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user: any = JSON.parse(localStorage.getItem('user'));
  constructor( private route: Router) { }

  ngOnInit() {
  }
  cerrarSesion() {
    localStorage.clear();
    this.route.navigate(['login']);

  }
}
