import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { PuntajeEvaluacion } from '../../interfaces/puntaje-evaluacion.interfaces';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { AumentoEvaluacion } from '../../interfaces/aumento-evaluacion.interfaces';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { AumentoEvaluacionService } from '../../services/aumento-evaluacion.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-puntaje-evaluacion-home',
  templateUrl: './puntaje-evaluacion-home.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class PuntajeEvaluacionHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de puntaje de evaluación
  puntajesEvaluacion: PuntajeEvaluacion[] = [];

  // Objeto para consultar al endpoint para obtener los aumentos por evaluación
  puntajeEvaluacionSelectRow!: PuntajeEvaluacion;
  
  // Variable para habilitar y deshabilitar pestaña aumento por evaluación
  isEnableAumentoTab: boolean = false;

  // Objeto de aumento por evaluación
  aumentoEvaluacion: AumentoEvaluacion[] = [];

  // Variable para elegir la pestaña del tabView
  tabIndex = 0;

  // Emisión de evento de padre a hijo (cargar data de puntajes de evaluación)
  @ViewChild(TipoNominaComponent) tipoNominaComponent!: TipoNominaComponent;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private selectRowServices: SelectRowService,
              private aumentoEvaluacionService: AumentoEvaluacionService,
              private messageService: MessageService,
              private spinner: NgxSpinnerService) { }

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
   * @param puntajesEvaluacionEvent: PuntajeEvaluacion[] lista de puntajes
   */
  getDataPuntajes(puntajesEvaluacionEvent: PuntajeEvaluacion[]): void {
    this.puntajesEvaluacion = puntajesEvaluacionEvent;
  }
  
  /************************************
   *     Aumento por evaluación       *
   ************************************/

  /**
   * Habilitar la pestaña aumento por evaluación
   * @param event: boolean
   */
  enableTabAumento(event: boolean) {
    // Vaciar la data aumento por evaluación
    this.aumentoEvaluacion = [];
    this.isEnableAumentoTab = event;
    // Si la variable es true, cambiar de pestaña a aumento por evaluacion cuando se clickee en el boton aumento
    if ( this.isEnableAumentoTab ) {
      this.tabIndex = 2;
    }
  }

  /**
   * Emitir data puntaje de evaluación y cargar aumento por evaluación
   * @param puntajeEvaluacionSelect: PuntajeEvaluacion
   */
  getDataPuntajeEvaluacion(puntajeEvaluacionEvent: PuntajeEvaluacion) {
    this.puntajeEvaluacionSelectRow = puntajeEvaluacionEvent;
    this.loadAumentoEvaluacion();
  }

  /**
   * Cargar aumento por evaluación
   */
  loadAumentoEvaluacion(): void {
    if ( !this.puntajeEvaluacionSelectRow ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha seleccionado un puntaje de evaluación.', life: 3000});
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.aumentoEvaluacionService.getAumentoByEmpresaNominaPuntaje(this.puntajeEvaluacionSelectRow)
      .subscribe({
        next: (res) => {
          this.aumentoEvaluacion = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
          this.spinner.hide();
        }
      });
  }

  /** Destrucción del observable */
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
