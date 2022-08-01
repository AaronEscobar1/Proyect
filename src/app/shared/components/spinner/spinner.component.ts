import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
  
  // Mensaje de carga
  @Input() loadingMessage: string = 'Cargando ...';

}
