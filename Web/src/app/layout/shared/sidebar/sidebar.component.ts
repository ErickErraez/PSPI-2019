import { Component, OnInit } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
user: any = JSON.parse(localStorage.getItem('user'));
  constructor( private route: Router) { }

  ngOnInit() {
  }
  cerrarSesion() {
    localStorage.clear();
    this.route.navigate(['login']);

  }
}
