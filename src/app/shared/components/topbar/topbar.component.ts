import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
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
  @Output() onToggleMenu    = new EventEmitter<Event>();

  /** Escucha los eventos del DOM */
  documentClickListener!: () => void;

  user!      : string;
  isModule   : boolean = false;

  // MenuResponsive
  topMenuActive!: boolean;
  menuTopClick!: boolean;

  // Icono de font awesome
  faArrowRightLeft = faArrowRightArrowLeft;

  constructor(private authService: AuthService,
              private router: Router,
              private storageService: StorageService,
              public renderer: Renderer2) { }


  ngOnInit(): void {
    this.loadUserName();
    this.validModule();
  }

  /** 
   * Ocultar menu responsive al hacer clicks en la pantalla 
   */
   ngAfterViewInit() {
    this.documentClickListener = this.renderer.listen('body', 'click', (event: PointerEvent) => {
      if (!this.menuTopClick) {
        this.topMenuActive = false;
      }
      this.menuTopClick = false;
    })
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

  toggeTopMenu(event: Event) {
    this.menuTopClick = true;
    this.topMenuActive = this.topMenuActive ? false : true;
    event.preventDefault();
  }

  toggleMenu(event: Event) {
    this.onToggleMenu.emit(event);
    event.preventDefault();
  }

}
