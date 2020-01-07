import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-student-proyect',
    templateUrl: './student-proyect.page.html',
    styleUrls: ['./student-proyect.page.scss'],
})
export class StudentProyectPage implements OnInit {

    id: string;

    constructor(private route: ActivatedRoute) {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
    }

    ngOnInit() {
    }

}
