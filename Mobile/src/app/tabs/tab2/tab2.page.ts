import {Component} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    items = [];

    constructor(public nav: NavController) {
    }

    abrirEnlace(item) {
        this.nav.navigateForward(`student-proyect/${item}`);

    }


}
