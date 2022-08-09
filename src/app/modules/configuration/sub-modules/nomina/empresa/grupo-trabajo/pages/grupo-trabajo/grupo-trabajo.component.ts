import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../interfaces/nominas.interfaces';
import { GrupoTrabajoService } from '../../services/grupo-trabajo.service';
import { GrupoTrabajo } from '../../interfaces/grupo-trabajo.interfaces';

@Component({
  selector: 'app-grupo-trabajo',
  templateUrl: './grupo-trabajo.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class GrupoTrabajoComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de grupos de trabajo por empresa y nomina
  @Input() gruposTrabajo: GrupoTrabajo[] = [];

  // Objeto seleccionado para editar
  grupoTrabajoSelect!: GrupoTrabajo | undefined;

  // Emisión de evento (cargar data de grupos)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar grupo de trabajo';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private grupoTrabajoService: GrupoTrabajoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  refresh(): void {
    this.gruposTrabajo = [];
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
    this.titleForm = 'Agregar grupo de trabajo';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.grupoTrabajoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param grupoTrabajo row de la tabla
   * @returns void
   */
   editRow(grupoTrabajo: GrupoTrabajo): void {
    this.isEdit = true;
    this.titleForm = 'Editar grupo de trabajo';
    this.grupoTrabajoSelect = grupoTrabajo;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param grupoTrabajo row de la tabla
   * @returns void
   */
  deleteRow(grupoTrabajo: GrupoTrabajo): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este grupo de trabajo <b>${grupoTrabajo.desgru}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.grupoTrabajoService.delete(this.empresaRow.id, this.nominaRow.tipnom, grupoTrabajo.codgru)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.grupoTrabajoService.selectRowGrupo$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el grupo de trabajo, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el grupo de trabajo.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
