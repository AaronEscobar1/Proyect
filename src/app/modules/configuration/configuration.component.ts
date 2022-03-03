import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styles: []
})
export class ConfigurationComponent implements OnInit {

  @Input() menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.menuItems = [
        {
            label: 'Nómina',
            icon: 'pi pi-book',
            items: [
                {
                    label: 'Niveles educativos',
                    routerLink: 'niveles-educativos'
                },
            ]
        }
      /*
          {
              label: 'Talento',
              icon: 'pi pi-cog',
              items: [
                  {label: 'Eliminar', icon: 'pi pi-fw pi-trash'},
                  {label: 'Refrescar', icon: 'pi pi-fw pi-refresh'}
              ]
          },
          {
              label: 'Seguro',
              icon: 'pi pi-star-fill',
              items: [
                  {
                      label: 'Contenido',
                      icon: 'pi pi-pi pi-bars'
                  },
                  {
                      label: 'Buscar', 
                      icon: 'pi pi-pi pi-search', 
                  }
              ]
          },
          {
          label: 'Guarderia',
          icon: 'pi pi-twitter',
          items: [
              {
                  label: 'Editar',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Guardar', icon: 'pi pi-fw pi-save'},
                      {label: 'Actualizar', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Otros',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Eliminar', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
          }
      */
    ];
  }

}
