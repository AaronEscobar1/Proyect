import { Component, OnInit } from '@angular/core';
import { ModuleCard } from 'src/app/shared/interfaces/modules-card.interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
