import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  id:String

  constructor( 
    private route:ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit() {
  }

}
