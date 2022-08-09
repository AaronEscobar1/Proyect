import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Nomina } from '../../interfaces/nominas.interfaces';
import { NominasService } from '../../services/nominas.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class NominasComponent {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de nóminas por empresa
  nominas: Nomina[] = [];

  // Objeto seleccionado para editar
  nominaSelect!: Nomina | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar nómina';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private nominasService: NominasService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService) { }
  
  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Limpia el row de la tabla de nóminas
      this.selectRowService.selectRowAlterno$.emit(null);
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadNominas(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de centro trabajo asignado a la empresa
   * @param id: string id empresa
   */
  loadNominas( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.nominasService.getAllNominasByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.nominas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.nominas = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadNominas(this.empresaRow.id);
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
    this.titleForm = 'Agregar nómina';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.nominaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param nomina row de la tabla
   * @returns void
   */
  editRow(nomina: Nomina): void {
    this.isEdit = true;
    this.titleForm = 'Editar nómina';
    this.nominaSelect = nomina;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param nomina row de la tabla
   * @returns void
   */
  deleteRow(nomina: Nomina): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta nomina <b>${nomina.desnom}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.nominasService.delete(nomina)
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
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la nómina.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
