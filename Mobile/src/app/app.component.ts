import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Network} from '@ionic-native/network/ngx';
import {NetworkService} from './services/network.service';
import {UserFormService} from './services/user-form.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private userService: UserFormService) {
        this.initializeApp();
      /*  this.userService.getEstudiantes().subscribe(r => {
            console.log(r.estudiantes);
        });*/
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

    }
}
