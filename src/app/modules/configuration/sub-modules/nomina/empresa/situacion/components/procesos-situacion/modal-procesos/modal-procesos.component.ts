import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Situacion } from '../../../interfaces/situacion.interfaces';
import { ProcesoSituacion } from '../../../interfaces/proceso-situacion.interfaces';
import { SuspencionVacacion } from '../../../interfaces/concepto-situacion.interfaces';
import { ProcesoSituacionService } from '../../../services/proceso-situacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Procesos } from '../../../../../basica/procesos/interfaces/procesos.interfaces';

@Component({
  selector: 'app-modal-procesos',
  templateUrl: './modal-procesos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ModalProcesosComponent implements OnInit {

  // Ver modal procesos
  @Input() dataTableProcesosModal!: boolean;

  // Variable del registro de la tabla
  situacionRow!: Situacion;

  // Titulo del modal
  title: string = 'Procesos a desactivar por situación';

  // Objeto de procesos de situacion
  procesosSituaciones: ProcesoSituacion[] = [];

  // Objeto para mostrar lista de procesos
  procesos: Procesos[] = [];

  // Objeto para mostrar lista de noSuspender
  noSuspender: SuspencionVacacion[] = [];

  // Emisión de eventos (cerrar)
  @Output() onCloseDataTableModal = new EventEmitter();

  constructor(private procesoSituacionService: ProcesoSituacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProcesos();
    this.loadSuspensionVacacion();
  }

  /**
   * Cargar los procesos 
   */
  loadProcesos(): void {
    this.spinner.show();
    this.procesoSituacionService.getProcesos()
      .subscribe({
        next: (res) => {
          this.procesos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Cargar datos de suspensiones por vacaciones
   */
  loadSuspensionVacacion(): void {
    this.spinner.show();
    this.procesoSituacionService.getSuspensionVacacion()
      .subscribe({
        next: (res) => {
          this.noSuspender = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Cargar procesos por situacion
   * @param situacion: Situacion
   */
  loadProcesosSituacion(situacion: Situacion): void {
    this.situacionRow = situacion;
    this.procesosSituaciones = [];
    this.spinner.show();
    this.procesoSituacionService.getAllProcesosSituacion(situacion)
      .subscribe({
        next: (res) => {
          this.procesosSituaciones = res;
          // Mapeo la data y agrego un atributo `idTableTemporal` para colocarlo como [dataKey] en la tabla table edit
          this.procesosSituaciones = this.procesosSituaciones.map((data, index) => { 
            return {...data, idTableTemporal: index }
          });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseDataTableModal.emit();
  }

}
