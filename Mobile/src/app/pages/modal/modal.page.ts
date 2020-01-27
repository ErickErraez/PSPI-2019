import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Categorias} from '../../models/Categorias';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

    categoria: Categorias = new Categorias();

    constructor(public modalController: ModalController, private navParams: NavParams) {
        this.categoria = navParams.get('categoria');
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

}
