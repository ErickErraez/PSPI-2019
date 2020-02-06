import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-works',
    templateUrl: './works.page.html',
    styleUrls: ['./works.page.scss'],
})
export class WorksPage implements OnInit {

    id: string;

    constructor(private route: ActivatedRoute, private nav: NavController) {
        this.id = this.route.snapshot.paramMap.get('id');
        alert(this.id);
    }

    ngOnInit() {
    }

}
