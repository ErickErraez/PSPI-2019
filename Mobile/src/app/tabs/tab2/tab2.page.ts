import { Component } from '@angular/core';
import { NavController,NavParams} from '@ionic/angular';
import { InformacionPage } from 'src/app/informacion/informacion.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items =[];
   
  constructor(public nav : NavController) {
    
    this.items = [
      {
        'title': 'Puerco',
       
        'description': 'Puerco',
        'color': '#E63135'
      },
      {
        'title': 'Puerco',
        
        'description': 'Puerco',
        'color': '#0CA9EA'
      },
      {
        'title': 'Puerco',
     
        'description': 'Puerco',
        'color': '#F46529'
      },
      {
        'title': 'Puerco',
        
        'description': 'Puerco',
        'color': '#FFD439'
      },
      {
        'title': 'Puerco',
     
        'description': 'Puerco',
        'color': '#CE6296'
      },
      {
        'title': 'Puerco',
        
        'description': 'Puerco',
        'color': '#78BD43'
      },
      {
        'title': 'Puerco',
       
        'description': 'Puerco',
        'color': '#3575AC'
      },
      {
        'title': 'Puerco',
      
        'description': 'Puerco',
        'color': '#412159'
      },
      {
        'title': 'Puerco',
      
        'description': 'Puerco',
        'color': '#000'
      },
    ]
  
  }
abrirEnlace(item){
  this.nav.navigateForward(`informacion/${item}`)
  
}
 

}
