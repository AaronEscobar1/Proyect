import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items      : MenuItem[]   = [];
  user       : string       = 'Alejandro';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.items = [
      {
          label: 'Inicio',
          icon: 'pi pi-fw pi-file',
      },
      {
          label: 'Mi perfil',
          icon: 'pi pi-fw pi-pencil',
      }
    ];
  }

  closeSession(): void {
    this.authService.closeSession();
  }

}
