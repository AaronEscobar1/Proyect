import { Component, OnInit } from '@angular/core';
import { ModuleCard } from '../../shared/interfaces/modules-card.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .layout-wrapper.layout-static .layout-main-container {
      margin-left: 0%;
    }
  `]
})
export class HomeComponent implements OnInit {

  modulesCard: ModuleCard[] = [];

  constructor() {
    this.modulesCard = [
      { img: 'assets/images/images_modules/archivo.jpg',      nameModule: 'Archivo',       path: 'archive' },
      { img: 'assets/images/images_modules/mail.jpg',         nameModule: 'Mail',          path: 'mail' },
      { img: 'assets/images/images_modules/organizacion.jpg', nameModule: 'Organización',  path: 'organization' },
      { img: 'assets/images/images_modules/seguridad.jpg',    nameModule: 'Seguridad',     path: 'security' },
      { img: 'assets/images/images_modules/talento.jpg',      nameModule: 'Talento',       path: 'talent' },
      { img: 'assets/images/images_modules/config.png',       nameModule: 'Configuración', path: 'config' }  
    ];
  }

  ngOnInit(): void {
  }
  
}
