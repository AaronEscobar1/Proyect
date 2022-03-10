import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styles: []
})
export class ConfigurationComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {

    this.menuItems = [
        {
          label: 'Nómina',
          icon: 'pi pi-book',
          items: [
            {
                label: 'Niveles educativos',
                routerLink: ['/main/config/niveles-educativos'],
            },
          ]
        }
    ];
  }

}
