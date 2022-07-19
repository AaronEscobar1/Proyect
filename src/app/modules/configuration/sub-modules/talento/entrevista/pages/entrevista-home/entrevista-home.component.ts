import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Subscription } from 'rxjs';
import { Entrevista } from '../../interfaces/entrevista.interfaces';

@Component({
  selector: 'app-entrevista-home',
  templateUrl: './entrevista-home.component.html'
})
export class EntrevistaHomeComponent implements OnInit, OnDestroy {

  // Variable para seleccionar el registro
  entrevistaRow!: any | null;
  
  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Entrevista) => this.entrevistaRow = row );
  }

   /** Destrucción del observable*/
   ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
