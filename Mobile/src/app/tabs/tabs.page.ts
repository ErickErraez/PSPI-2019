import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AdminService} from '../services/admin.service';
import {WebsocketsService} from '../services/websockets.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    show: any = {};
    usuario: any = JSON.parse(localStorage.getItem('usuario'));

    constructor(private adminService: AdminService) {
        this.adminService.getConfiguracion().subscribe(res => {
            this.show = res;
            this.show = this.show.datos;
        });
    }

}
