import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() titleBanner: string = 'Nomina Java';

  user       : string       = 'Alejandro';
  isModule   : boolean      = false;

  // Icono de font awesome
  faArrowRightLeft = faArrowRightArrowLeft;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.validModule();
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
