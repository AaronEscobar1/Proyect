import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items      : MenuItem[]   = [];
  user       : string       = 'Alejandro';
  isModule   : boolean      = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.validModule();
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

  validModule(): void {
    const url = this.router.url.split('/');
    if (url[2] !== 'home') {
      this.isModule = true;
    }
  }

  closeSession(): void {
    this.authService.closeSession();
  }

}
