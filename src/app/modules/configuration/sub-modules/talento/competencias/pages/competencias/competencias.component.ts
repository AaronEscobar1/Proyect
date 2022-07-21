import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Competencias, TiposCompetencias } from '../../interfaces/competencias.interfaces';
import { CompetenciasService } from '../../services/competencias.service';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class CompetenciasComponent implements OnInit {

  // Objetos competencias
  competencias      : Competencias[] = [];
  competenciaSelect!: Competencias | undefined;
  tiposCompetencias : TiposCompetencias[] = [];

  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar competencia';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private competenciasService: CompetenciasService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadTiposCompetencias();
  }

  loadData() {
    this.spinner.show();
    this.competenciasService.getAll()
      .subscribe({
        next: (res) => {
          this.competencias = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  loadTiposCompetencias() {
    this.spinner.show();
    this.competenciasService.getAllTiposCompetencias()
      .subscribe({
        next: (res) => {
          this.tiposCompetencias = res;
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
    this.titleForm = 'Agregar competencia';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.competenciaSelect = undefined;
  }

  refresh(): void {
    this.competencias = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param competencia row de la tabla
   */
  editRow(competencia: Competencias) {
    this.isEdit = true;
    this.titleForm = 'Editar competencia';
    this.competenciaSelect = competencia;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param competencia row de la tabla
   * @returns void
   */
  deleteRow(competencia: Competencias) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta competencia <b>${competencia.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.competenciasService.delete(competencia.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowServices.selectRow$.emit(null);
              this.loadData();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la competencia, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la competencia.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
