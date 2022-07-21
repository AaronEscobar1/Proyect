import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Subscription } from 'rxjs';
import { Competencias } from '../../interfaces/competencias.interfaces';

@Component({
  selector: 'app-competencias-home',
  templateUrl: './competencias-home.component.html'
})
export class CompetenciasHomeComponent implements OnInit, OnDestroy  {

  // Variable para seleccionar el registro
  competenciaRow!: any | null;
  
  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Competencias) => this.competenciaRow = row );
  }

   /** Destrucción del observable*/
   ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
