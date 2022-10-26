import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})


export class ErrorComponent {

  constructor(
    private router: Router,
  ) {}

  // Navegación al recargar la página
  @HostListener("window:load", ["$event"])
  refreshWindow() {
    this.router.navigateByUrl('/');
  }

  // Mensaje de error
  errorMessage: string = 'Error...';

}
