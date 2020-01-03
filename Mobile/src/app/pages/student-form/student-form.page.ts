import {Component, OnInit} from '@angular/core';
import {NavController, Platform, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-user-form',
    templateUrl: './student-form.page.html',
    styleUrls: ['./student-form.page.scss'],
})
export class StudentFormPage implements OnInit {

    constructor(private route: NavController, private platform: Platform) {
        this.platform.backButton.subscribeWithPriority(1, () => {
            navigator['app'].exitApp();
        });
    }

    ngOnInit() {
    }

    cerrar() {
        this.route.navigateRoot(['login']);
    }

}
