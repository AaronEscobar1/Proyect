import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { TipoNomina } from '../../../grupo-trabajo/interfaces/nominas.interfaces';
import { PuntajeEvaluacion } from '../../interfaces/puntaje-evaluacion.interfaces';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-puntaje-evaluacion-home',
  templateUrl: './puntaje-evaluacion-home.component.html'
})
export class PuntajeEvaluacionHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de puntaje de evaluación
  puntajesEvaluacion: PuntajeEvaluacion[] = [];
  
  // Emisión de evento de padre a hijo (cargar data de puntajes de evaluación)
  @ViewChild(TipoNominaComponent) tipoNominaComponent!: TipoNominaComponent;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable empresa
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Company) => this.empresaRow = row );
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => this.nominaRow = row );
  }

  /**
   * Cargar puntajes de evaluacion
   */
  refresh(): void {
    this.tipoNominaComponent.loadPuntajesEvaluacion();
  }

  /**
   * Obtener todos los puntajes de evaluación por empresa y tipo de nomina
   * @param puntajesEvaluacionesEvent: PuntajeEvaluacion[] lista de puntajes
   */
  getDataGrupo(puntajesEvaluacionEvent: PuntajeEvaluacion[]): void {
    this.puntajesEvaluacion = puntajesEvaluacionEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
