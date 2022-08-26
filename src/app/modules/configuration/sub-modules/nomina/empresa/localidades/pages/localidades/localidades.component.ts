import { Component, Input } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { LocalidadesService } from '../../services/localidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Localidad } from '../../interfaces/localidades.interfaces';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class LocalidadesComponent {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de localidades por empresa
  localidades: Localidad[] = [];

  // Objeto seleccionado para editar
  localidadSelect!: Localidad | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar localidad';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private localidadesService: LocalidadesService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadLocalidades(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de localidades asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadLocalidades( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.localidadesService.getLocalidadesByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.localidades = res;
          console.log(this.localidades);
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.localidades = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadLocalidades(this.empresaRow.id);
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
    this.titleForm = 'Agregar localidad';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.localidadSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param localidad row de la tabla
   * @returns void
   */
  editRow(localidad: Localidad): void {
    this.isEdit = true;
    this.titleForm = 'Editar localidad';
    this.localidadSelect = localidad;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param localidad row de la tabla
   * @returns void
   */
  deleteRow(localidad: Localidad): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta localidad <b>${localidad.codloc}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.localidadesService.delete(this.empresaRow.id, localidad)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la localidad, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la localidad.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
