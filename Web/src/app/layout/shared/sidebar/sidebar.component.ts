import { Component, OnInit } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  show: any = {};
  usuario: any = JSON.parse(localStorage.getItem('usuario'));

  constructor( private route: Router,private adminService:AdminService) {
    this.adminService.getConfiguracion().subscribe(res=>{
      this.show = res;
      this.show = this.show.datos;
    })
  }

  ngOnInit() {
  }
  cerrarSesion() {
    localStorage.clear();
    this.route.navigate(['login']);

  }
getUsuario(){
    this
}
}
