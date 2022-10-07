import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AumentoEvaluacion } from '../../interfaces/aumento-evaluacion.interfaces';
import { PuntajeEvaluacion } from '../../interfaces/puntaje-evaluacion.interfaces';
import { AumentoEvaluacionService } from '../../services/aumento-evaluacion.service';

@Component({
  selector: 'app-aumento-evaluacion',
  templateUrl: './aumento-evaluacion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class AumentoEvaluacionComponent implements OnInit {

  // Objeto seleccionado en la tabla puntaje de evaluación
  @Input() puntajeEvaluacionSelectRow!: PuntajeEvaluacion;

  // Objeto de aumento por evaluación
  @Input() aumentoEvaluacion: AumentoEvaluacion[] = [];

  // Objeto seleccionado para editar
  aumentoEvaluacionSelect!: AumentoEvaluacion | undefined;

  // Emisión de evento (cargar data de aumento por evaluación)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar aumento por evaluación';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private aumentoEvaluacionService: AumentoEvaluacionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  refresh(): void {
    this.aumentoEvaluacion = [];
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
    this.titleForm = 'Agregar aumento de evaluación';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.aumentoEvaluacionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param aumentoEvaluacion row de la tabla
   * @returns void
   */
   editRow(aumentoEvaluacion: AumentoEvaluacion): void {
    this.isEdit = true;
    this.titleForm = 'Editar aumento de evaluación';
    this.aumentoEvaluacionSelect = aumentoEvaluacion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param aumentoEvaluacion row de la tabla
   * @returns void
   */
  deleteRow(aumentoEvaluacion: AumentoEvaluacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este aumento por evaluación?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.aumentoEvaluacionService.delete(aumentoEvaluacion)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.aumentoEvaluacionService.selectRowAumento$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el aumento por evaluación, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el aumento por evaluación.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
