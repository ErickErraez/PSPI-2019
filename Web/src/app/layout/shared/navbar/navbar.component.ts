import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user: any = JSON.parse(localStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
  }

}
