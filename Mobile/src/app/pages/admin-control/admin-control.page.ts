import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';

@Component({
    selector: 'app-admin-control',
    templateUrl: './admin-control.page.html',
    styleUrls: ['./admin-control.page.scss'],
})
export class AdminControlPage implements OnInit {

    show: any = {};

    constructor(private adminService: AdminService) {
        this.adminService.getConfiguracion().subscribe(res => {
            this.show = res;
            this.show = this.show.datos;
        });
    }

    ngOnInit() {
    }

    changeStatus() {
        if (this.show.formularioSolicitud) {
            this.show.formularioSolicitud = false;
            this.adminService.updateConfiguraciones(this.show).subscribe(res => {
                console.log(res);
            });
        } else {
            this.show.formularioSolicitud = true;
            this.adminService.updateConfiguraciones(this.show).subscribe(res => {
                console.log(res);
            });
        }
    }

}
