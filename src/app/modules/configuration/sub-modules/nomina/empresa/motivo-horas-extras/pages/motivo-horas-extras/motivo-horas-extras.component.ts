import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { MotivoHoraExtra } from '../../interfaces/motivo-horas-extras.interfaces';
import { MotivoHorasExtrasService } from '../../services/motivo-horas-extras.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';

@Component({
  selector: 'app-motivo-horas-extras',
  templateUrl: './motivo-horas-extras.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class MotivoHorasExtrasComponent {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto motivo horas extras
  motivoHorasExtras: MotivoHoraExtra[] = [];

  // Objeto seleccionado para editar
  motivoHoraExtraSelect!: MotivoHoraExtra | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar motivo hora extra';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private motivoHorasExtrasService: MotivoHorasExtrasService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadMotivoHorasExtras(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de motivo horas extras asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadMotivoHorasExtras( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.motivoHorasExtrasService.getMotivosHorasExtrasByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.motivoHorasExtras = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.motivoHorasExtras = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadMotivoHorasExtras(this.empresaRow.id);
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
    this.titleForm = 'Agregar motivo hora extra';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.motivoHoraExtraSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param motivoHoraExtra row de la tabla
   * @returns void
   */
  editRow(motivoHoraExtra: MotivoHoraExtra): void {
    this.isEdit = true;
    this.titleForm = 'Editar motivo hora extra';
    this.motivoHoraExtraSelect = motivoHoraExtra;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param motivoHoraExtra row de la tabla
   * @returns void
   */
  deleteRow(motivoHoraExtra: MotivoHoraExtra): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este motivo hora extra <b>${motivoHoraExtra.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.motivoHorasExtrasService.delete(motivoHoraExtra)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.companyNominaService.selectRowThirdTable$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el motivo hora extra, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el motivo hora extra.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
