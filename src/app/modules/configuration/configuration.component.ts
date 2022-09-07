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
              label: 'Básica',
              items: [
                {
                  label: 'Niveles educativos',
                  routerLink: ['/main/config/basica/niveles-educativos'],
                },
                {
                  label: 'Profesiones',
                  routerLink: ['/main/config/basica/profesiones'],
                },
                {
                  label: 'Formas de pago',
                  routerLink: ['/main/config/basica/formas-pago'],
                },
                {
                  label: 'Motivos de finiquito',
                  routerLink: ['/main/config/basica/motivos-finiquito'],
                },
                {
                  label: 'Procesos',
                  routerLink: ['/main/config/basica/procesos'],
                },
                {
                  label: 'Categorias',
                  routerLink: ['/main/config/basica/categories'],
                },
                {
                  label: 'Centros médicos',
                  routerLink: ['/main/config/basica/centros-medicos'],
                },
                {
                  label: 'Valores oficiales',
                  routerLink: ['/main/config/basica/valor-oficial'],
                },
                {
                  label: 'Clasificación oficial',
                  routerLink: ['/main/config/basica/clasificacion-oficial'],
                },
                {
                  label: 'Sindicatos',
                  routerLink: ['/main/config/basica/sindicatos'],
                },
                {
                  label: 'Motivos de cambios',
                  routerLink: ['/main/config/basica/motivos-cambios'],
                }
              ]
            },
            {
              label: 'Deposito',
              items: [
                {
                  label: 'Tipo instituciones',
                  routerLink: ['/main/config/deposito/tipo-instituciones']
                },
                {
                  label: 'Tipo cuenta',
                  routerLink: ['/main/config/deposito/tipo-cuenta']
                },
                {
                  label: 'Instituciones',
                  routerLink: ['/main/config/deposito/instituciones']
                }
              ]
            },
            {
              label: 'Empresa',
              items: [
                {
                  label: 'Empresas',
                  routerLink: ['/main/config/empresa/compania'],
                },
                {
                  label: 'Distribución de Nómina',
                  routerLink: ['/main/config/empresa/distribucion-nomina']
                },
                {
                  label: 'Centro de trabajo',
                  routerLink: ['/main/config/empresa/centro-trabajo']
                },
                {
                  label: 'Grupos de trabajo',
                  routerLink: ['/main/config/empresa/grupos-trabajo']
                },
                {
                  label: 'Nóminas',
                  routerLink: ['/main/config/empresa/nominas']
                },
                {
                  label: 'Tarifas de impuestos',
                  routerLink: ['/main/config/empresa/empresa-consultar/tarifas']
                },
                {
                  label: 'Puntaje de evaluación',
                  routerLink: ['/main/config/empresa/puntaje-evaluacion']
                },
                {
                  label: 'Situación',
                  routerLink: ['/main/config/empresa/situacion']
                },
                {
                  label: 'Tipos de sueldos',
                  routerLink: ['/main/config/empresa/tipos-sueldos']
                },
                {
                  label: 'Niveles de excepción',
                  routerLink: ['/main/config/empresa/niveles-excepcion']
                },
                {
                  label: 'Motivo horas extras',
                  routerLink: ['/main/config/empresa/motivo-horas-extras']
                },
                {
                  label: 'Localidades',
                  routerLink: ['/main/config/empresa/localidades']
                },
                {
                  label: 'Clase de información',
                  routerLink: ['/main/config/empresa/clase-informacion']
                }
              ]
            },
            {
              label: 'Monedas',
              items: [
                {
                  label: 'Tipos de monedas',
                  routerLink: ['/main/config/monedas/tipo-moneda'],
                }
              ]
            }            
          ]
        },
        {
          label: 'Organización',
          icon: 'pi pi-sitemap',
          items: [
            {
              label: 'Tipo de identificacion',
              routerLink: ['/main/config/organizacion/tipo-identificacion']
            },
            {
              label: 'Estados civiles',
              routerLink: ['/main/config/organizacion/estado-civil']
            },
            {
              label: 'Empresa',
              routerLink: ['/main/config/organizacion/parametros-iniciales']
            }
          ]
        },
        {
          label: 'Talento',
          icon: 'pi pi-star',
          items: [
            {
              label: 'Parentescos',
              routerLink: ['/main/config/talento/parentesco']
            },
            {
              label: 'Competencias',
              routerLink: ['/main/config/talento/competencias']
            },
            {
              label: 'Evaluaciones',
              routerLink: ['/main/config/talento/evaluaciones']
            },
            {
              label: 'Información adicional',
              routerLink: ['/main/config/talento/informacion-adicional']
            },
            {
              label: 'Entrevistas',
              routerLink: ['/main/config/talento/entrevistas']
            }
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
