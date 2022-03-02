import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar-vertical',
  templateUrl: './navbar-vertical.component.html',
  styleUrls: ['./navbar-vertical.component.scss']
})
export class NavbarVerticalComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.items = [
        {
            label: 'Configuración',
            icon: 'pi pi-cog',
            items: [{
                    label: 'Nuevo', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'Usuarios', icon: 'pi pi-fw pi-user-plus'},
                        {label: 'Filtrar', icon: 'pi pi-fw pi-filter'}
                    ]
                },
                {label: 'Editar', icon: 'pi pi-pencil'},
            ]
        },
        {
            label: 'Talento',
            icon: 'pi pi-book',
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
  ];
  }

}
