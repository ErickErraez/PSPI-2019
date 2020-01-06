import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {IonicStorageModule} from '@ionic/storage';
import {ModalPage} from './pages/modal/modal.page';
import {FormsModule} from '@angular/forms';

import { InformacionPageModule } from './informacion/informacion.module';

@NgModule({
    declarations: [AppComponent,
        ModalPage,
        
    ],
    entryComponents: [ModalPage],
    imports: [
        BrowserModule,
        FormsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
