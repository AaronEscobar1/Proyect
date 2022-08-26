import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoSueldoService } from '../../services/tipo-sueldo.service';
import { TipoSueldo } from '../../interfaces/tipo-sueldo.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-tipo-sueldo',
  templateUrl: './tipo-sueldo.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoSueldoComponent {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de nóminas por empresa
  tipoSueldos: TipoSueldo[] = [];

  // Objeto seleccionado para editar
  tipoSueldoSelect!: TipoSueldo | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tipo de sueldo';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoSueldoService: TipoSueldoService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadTiposSueldos(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de tipos de sueldos asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadTiposSueldos( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.tipoSueldoService.getTiposSueldosByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.tipoSueldos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.tipoSueldos = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadTiposSueldos(this.empresaRow.id);
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
    this.titleForm = 'Agregar tipo de sueldo';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.tipoSueldoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param tipoSueldo row de la tabla
   * @returns void
   */
  editRow(tipoSueldo: TipoSueldo): void {
    this.isEdit = true;
    this.titleForm = 'Editar tipo de sueldo';
    this.tipoSueldoSelect = tipoSueldo;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param tipoSueldo row de la tabla
   * @returns void
   */
  deleteRow(tipoSueldo: TipoSueldo): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este tipo de sueldo <b>${tipoSueldo.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tipoSueldoService.delete(tipoSueldo)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el tipo de sueldo, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el tipo de sueldo.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
