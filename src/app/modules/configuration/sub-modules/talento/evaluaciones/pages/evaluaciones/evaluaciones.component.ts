import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Evaluaciones, TiposEvaluaciones } from '../../interfaces/evaluaciones.interfaces';
import { EvaluacionesService } from '../../services/evaluaciones.service';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EvaluacionesComponent implements OnInit {

  // Objetos
  evaluaciones     : Evaluaciones[] = [];
  evaluacionSelect!: Evaluaciones | undefined;
  tiposEvaluaciones: TiposEvaluaciones[] = [];
  
  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar evaluación';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private evaluacionesService: EvaluacionesService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadTiposEvaluaciones();
  }

  loadData(){
    this.spinner.show();
    this.evaluacionesService.getAll()
      .subscribe({
        next: (res) => {
          this.evaluaciones = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }
  
  loadTiposEvaluaciones() {
    this.spinner.show();
    this.evaluacionesService.getAllTiposEvaluaciones()
      .subscribe({
        next: (res) => {
          this.tiposEvaluaciones = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }
  
  openModalCreate(): void {
    this.isEdit = false;
    this.titleForm = 'Agregar evaluación';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.evaluacionSelect = undefined;
  }

  refresh(): void {
    this.evaluaciones = [];
    this.loadData();
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param evaluacion row de la tabla
   */
  editRow(evaluacion: Evaluaciones) {
    this.isEdit = true;
    this.titleForm = 'Editar evaluación';
    this.evaluacionSelect = evaluacion;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param evaluacion row de la tabla
   * @returns void
   */
  deleteRow(evaluacion: Evaluaciones) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta evaluación <b>${evaluacion.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.evaluacionesService.delete(evaluacion.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowServices.selectRow$.emit(null);
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la evaluación.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
