import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: [`
    .separator {
      padding: 1rem;
      border-left: 1px solid white;
    }
    a {
      text-decoration: none
    }
  `]
})
export class TopbarComponent implements OnInit {

  @Input() titleBanner: string = 'SPI portal';

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
