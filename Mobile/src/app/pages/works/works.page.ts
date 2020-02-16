import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FileSaver} from 'file-saver';
import {NavController, Platform} from '@ionic/angular';
import {Adjuntos} from '../../models/Adjuntos';
import {ProyectService} from '../../services/proyect.service';
import {Notas} from '../../models/Notas';
import {DomSanitizer} from '@angular/platform-browser';
import {saveAs} from 'file-saver';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-works',
    templateUrl: './works.page.html',
    styleUrls: ['./works.page.scss'],
})
export class WorksPage implements OnInit {

    id: string;
    rol: string;
    adjunto: Adjuntos = new Adjuntos();
    elements: any = [];
    nota: Notas = new Notas();
    adjuntos: any = [];
    url: any;

    constructor(public platform: Platform, private domSanitizer: DomSanitizer, private route: ActivatedRoute, private nav: NavController, private proyectService: ProyectService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.rol = this.route.snapshot.paramMap.get('rol');
    }

    ngOnInit() {
        this.getData();
    }


    CodificarArchivo(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[i];
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.adjunto.nombre = file.name;
                    this.adjunto.tipo = file.type;
                    this.adjunto.contenido = reader.result.toString().split(',')[1];
                    this.adjunto.idNotas = parseInt(this.id);
                    this.elements.push(this.adjunto);
                    this.adjunto = new Adjuntos();
                };
            }
        }
        console.log(this.elements);
    }

    getData() {
        this.proyectService.getNotas(this.id).subscribe(r => {
            this.nota = r['datos'];
            console.log(this.nota.nota);
        }, error => {
            console.log(error);
        });
        if (parseInt(this.rol) == 3) {
            this.proyectService.getAdjuntosByNotas(this.id).subscribe(re => {
                this.adjuntos = re['datos'];
            });
        }
    }

    typeClass() {
        if (this.nota.nota > 50) {
            return true;
        } else {
            return false;
        }
    }

    enviarTarea() {
        const update = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.nota.fechaEntrega = update;
        if (this.elements.length !== 0) {
            this.proyectService.actualizarNota(this.nota).subscribe(res => {
                for (let i = 0; i < this.elements.length; i++) {
                    this.proyectService.createAdjuntos(this.elements[i]).subscribe(r => {

                    });
                }
            });
        } else {
            alert('Debes Adjuntar un archivo');
        }
    }

    calificar() {

    }


    public download(nombreArchivo, tipoarchivo, archivoAdjunto) {

        const fileSaver = require('file-saver');
        const data: any = 'data:' + tipoarchivo + ';base64,' + archivoAdjunto;
        fileSaver.saveAs(data, nombreArchivo);
    }

}
