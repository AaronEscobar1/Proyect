import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { TipoNomina } from '../../../grupo-trabajo/interfaces/nominas.interfaces';
import { PuntajeEvaluacion } from '../../interfaces/puntaje-evaluacion.interfaces';
import { PuntajeEvaluacionService } from '../../services/puntaje-evaluacion.service';

@Component({
  selector: 'app-puntaje-evaluacion',
  templateUrl: './puntaje-evaluacion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class PuntajeEvaluacionComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de puntajes de evaluacion por empresa y nomina
  @Input() puntajesEvaluacion: PuntajeEvaluacion[] = [];

  // Objeto seleccionado para editar
  puntajeEvaluacionSelect!: PuntajeEvaluacion | undefined;

  // Emisión de evento (cargar data de puntajes de evaluacion)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar puntaje de evaluación';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private puntajeEvaluacionService: PuntajeEvaluacionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  refresh(): void {
    this.puntajesEvaluacion = [];
    this.onRefresh.emit();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Abre modal para crear
   * @returns void
   */
  openModalCreate(): void {
    this.titleForm = 'Agregar puntaje de evaluación';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.puntajeEvaluacionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param puntajeEvaluacion row de la tabla
   * @returns void
   */
   editRow(puntajeEvaluacion: PuntajeEvaluacion): void {
    this.isEdit = true;
    this.titleForm = 'Editar puntaje de evaluación';
    this.puntajeEvaluacionSelect = puntajeEvaluacion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param puntajeEvaluacion row de la tabla
   * @returns void
   */
  deleteRow(puntajeEvaluacion: PuntajeEvaluacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este puntaje de evaluación <b>${puntajeEvaluacion.despun}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.puntajeEvaluacionService.delete(puntajeEvaluacion)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.puntajeEvaluacionService.selectRowPuntaje$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el puntaje de evaluación, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el puntaje de evaluación.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
