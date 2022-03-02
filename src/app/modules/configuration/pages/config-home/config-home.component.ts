import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.scss']
})
export class ConfigHomeComponent implements OnInit {

  pathUrl: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getPathActive() {
    const url = this.router.url.split('/');
    console.log(url);
    // if (url.length <= 2) {
    //   this.pathUrl = url[1];
    // } else {
    //   this.pathUrl = '';
    // }
  }

}
