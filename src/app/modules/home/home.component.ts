import { Component, OnInit } from '@angular/core';
import { ModuleCard } from '../../shared/interfaces/modules-card.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modulesCard: ModuleCard[] = [];

  constructor() {
    this.modulesCard = [
      { img: 'assets/images/images_modules/archivo.jpg',      nameModule: 'Archivo',      path: 'config' },
      { img: 'assets/images/images_modules/mail.jpg',         nameModule: 'Mail',         path: 'mail' },
      { img: 'assets/images/images_modules/organizacion.jpg', nameModule: 'Organización', path: 'organization' },
      { img: 'assets/images/images_modules/seguridad.jpg',    nameModule: 'Seguridad',    path: 'security' }, 
      { img: 'assets/images/images_modules/talento.jpg',      nameModule: 'Talento',      path: 'talent' },    
    ];
  }

  ngOnInit(): void {
  }
}
