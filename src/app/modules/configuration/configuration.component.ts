import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styles: [`
    .fondo-img {
        background-image: url("./../../../assets/images/fondo_module/talento.jpg");
        background-size: 100%;
        background-repeat: no-repeat;
    }
  `]
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  menuItems  : MenuItem[] = [];
  isPageHome!: boolean;
  subscriber!: Subscription;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.validUrl();
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
  
  /**
   * Metodo para validar que se encuentra en el home
   * Objetivo: Colocar la imagen de fondo en el home
   */
  validUrl(): void {
    this.isPageHome = (this.router.url === '/main/config') ? true: false;
    this.subscriber = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => this.isPageHome = (event.url == '/main/config' ) ? true : false);
  }

  /**
   * Valido si mi subscriber sigue activo y me desuscribo, 
   * Sino seguirá activo escuchando cuando se navegue a otro componente donde no lo requiera.
   */
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

}
