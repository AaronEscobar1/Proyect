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
      { img: 'assets/images/images_modules/archivo.svg',      nameModule: 'Archivo',       path: 'archive' },
      { img: 'assets/images/images_modules/mail.svg',         nameModule: 'Mail',          path: 'mail' },
      { img: 'assets/images/images_modules/organizacion.svg', nameModule: 'Organización',  path: 'organization' },
      { img: 'assets/images/images_modules/seguridad.svg',    nameModule: 'Seguridad',     path: 'security' },
      { img: 'assets/images/images_modules/talento.svg',      nameModule: 'Talento',       path: 'talent' },
      { img: 'assets/images/images_modules/config.svg',       nameModule: 'Configuración', path: 'config' }  
    ];
  }

  ngOnInit(): void {
  }
  
}
