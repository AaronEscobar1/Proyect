import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { ResponseUser } from '../../../auth/interfaces/response-user.interfaces';

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

  user!      : string;
  isModule   : boolean = false;

  // MenuResponsive
  topMenuActive!: boolean;

  // Icono de font awesome
  faArrowRightLeft = faArrowRightArrowLeft;

  constructor(private authService: AuthService,
              private router: Router,
              private storageService: StorageService) { }


  ngOnInit(): void {
    this.loadUserName();
    this.validModule();
  }

  loadUserName() {
    const auth: ResponseUser = this.storageService.get('auth');
    this.user = (auth.ssUsuario && auth.ssUsuario.id) ? auth.ssUsuario.id : '';
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

  openTopMenu(event: Event) {
    this.topMenuActive = this.topMenuActive ? false : true;
    event.preventDefault();
  }

}
