import { Component, OnInit, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styles: []
})
export class ArchiveComponent implements OnInit {

  /** Escucha los eventos del DOM */
  documentClickListener!: () => void;
  
  menuItems: MenuItem[] = [];

  // Menu responsive
  menuClick! : boolean;
  menuActiveMobile! : boolean;

  constructor(public renderer: Renderer2) { }

  ngOnInit(): void {
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

}
