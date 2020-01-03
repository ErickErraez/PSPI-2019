import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-user-form',
    templateUrl: './student-form.page.html',
    styleUrls: ['./student-form.page.scss'],
})
export class StudentFormPage implements OnInit {

    constructor(private route: NavController) {
    }

    ngOnInit() {
    }

    cerrar() {
        this.route.navigateRoot(['login']);
    }

}
