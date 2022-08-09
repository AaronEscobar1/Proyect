import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CentroTrabajo } from '../../interfaces/distribucion-impuesto.interfaces';
import { CentroTrabajoService } from '../../services/centro-trabajo.service';

@Component({
  selector: 'app-centro-trabajo',
  templateUrl: './centro-trabajo.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class CentroTrabajoComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de centros de trabajos por empresa
  centrosTrabajos: CentroTrabajo[] = [];

  // Objeto seleccionado para editar
  centroTrabajoSelect!: CentroTrabajo | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar centro de trabajo';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private centroTrabajoService: CentroTrabajoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Limpia el row de la tabla de centro de trabajo
      this.selectRowService.selectRowAlterno$.emit(null);
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadCentroTrabajo(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de centro trabajo asignado a la empresa
   * @param id: string id empresa
   */
  loadCentroTrabajo( idEmpresa: string ) {
    this.spinner.show(undefined, spinnerLight);
    this.centroTrabajoService.getAllCentrosTrabajosByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.centrosTrabajos = res;    
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.centrosTrabajos = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadCentroTrabajo(this.empresaRow.id);
    }
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
    this.titleForm = 'Agregar centro de trabajo';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.centroTrabajoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param centroTrabajo row de la tabla
   * @returns void
   */
  editRow(centroTrabajo: CentroTrabajo): void {
    this.isEdit = true;
    this.titleForm = 'Editar centro de trabajo';
    this.centroTrabajoSelect = centroTrabajo;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param centroTrabajo row de la tabla
   * @returns void
   */
  deleteRow(centroTrabajo: CentroTrabajo): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este centro de trabajo <b>${centroTrabajo.descen}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.centroTrabajoService.delete(centroTrabajo)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRowAlterno$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el centro de trabajo, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el centro de trabajo.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
