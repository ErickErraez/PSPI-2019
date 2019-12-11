import {Component, OnInit} from '@angular/core';
import {MailService} from '../../services/mail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: any;
  asunto: any;
  mensaje: any;

  constructor(private mailServices: MailService) {
  }

  ngOnInit() {

  }

  enviarNotas() {
    this.mailServices.sendEmailMessage(this.email, this.asunto, this.mensaje).subscribe(r => {

    });
  }

}
