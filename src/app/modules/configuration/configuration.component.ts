import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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

  /** Escucha los eventos del DOM */
  documentClickListener!: () => void;
  
  menuItems  : MenuItem[] = [];
  isPageHome!: boolean;
  subscriber!: Subscription;
  
  // Menu responsive
  menuClick! : boolean;
  menuActiveMobile! : boolean;

  constructor(private router: Router,
              public renderer: Renderer2) {}
  
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
            {
              label: 'Profesiones',
              routerLink: ['/main/config/profesiones'],
            },
            {
              label: 'Formas de pago',
              routerLink: ['/main/config/formas-pago'],
            },
            {
              label: 'Motivos de finiquito',
              routerLink: ['/main/config/motivos-finiquito'],
            },
            {
              label: 'Procesos',
              routerLink: ['/main/config/procesos'],
            },
            {
              label: 'Categorias',
              routerLink: ['/main/config/categories'],
            },
          ]
        }
    ];
  }
  
  /** 
   * Ocultar menu responsive al hacer clicks en la pantalla 
   */
  ngAfterViewInit() {
    this.documentClickListener = this.renderer.listen('body', 'click', (event: PointerEvent) => {
      if (this.isMobile() && event.x > 300) {
        if (!this.menuClick) {
          this.menuActiveMobile = false;
        }
      }
      this.menuClick = false;
    })
  }

  /**
   * Metodo para validar que se encuentra en el home
   * Objetivo: Colocar la imagen de fondo en el home
   */
  validUrl(): void {
    this.isPageHome = (this.router.url === '/main/config') ? true: false;
    this.subscriber = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => this.isPageHome = (event.url == '/main/config' ) ? true : false);
  }

  /**
   * Abrir menu lateral responsive
   */
  toggleMenu(event: Event) {
    this.menuClick = true;
    this.menuActiveMobile = !this.menuActiveMobile;
    event.preventDefault();
  }

  /** 
   * Valida si el ancho de la pantalla es mayor a 320 
   */
  isMobile() {
    return window.innerWidth > 320;
  }

  /**
   * Valido si mi subscriber sigue activo y me desuscribo, 
   * Sino seguirá activo escuchando cuando se navegue a otro componente donde no lo requiera.
   */
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

}
