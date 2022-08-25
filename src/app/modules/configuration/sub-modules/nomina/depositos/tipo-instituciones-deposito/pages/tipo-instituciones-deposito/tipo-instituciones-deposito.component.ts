import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { TipoInstitucionesDepositoService } from '../../services/tipo-instituciones-deposito.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClasificacionInstituciones, TipoInstitucion } from '../../interfaces/tipo-instituciones-deposito.interfaces';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-tipo-instituciones-deposito',
  templateUrl: './tipo-instituciones-deposito.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoInstitucionesDepositoComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto tipos instituciones extras
  tiposInstituciones: TipoInstitucion[] = [];

  // Objeto seleccionado para editar
  tipoInstitucionSelect!: TipoInstitucion | undefined;

  // Objeto de clases instituciones depositos
  clasificaciones: ClasificacionInstituciones[] = [];
  // Objeto de clases instituciones depositos para filtrar en tabla
  clasificacionesFilter: dropdownType[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tipo institución';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoInstitucionesDepositoService: TipoInstitucionesDepositoService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadClasificacionInstituciones();
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadTiposInstituciones(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de tipos instituciones asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadTiposInstituciones( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.tipoInstitucionesDepositoService.getTiposInstitucionesByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.tiposInstituciones = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener clasificaciones de instituciones
   */
  loadClasificacionInstituciones(): void {
    this.spinner.show();
    this.tipoInstitucionesDepositoService.getClasificacionInstituciones()
      .subscribe({
        next: (res) => {
          this.clasificaciones = res;
          // Transformo el array de objetos para poder filtar en la datable
          this.clasificacionesFilter = this.clasificaciones.map(dato => { return { label: dato.descripcion, value: dato.clatip } });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.tiposInstituciones = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadTiposInstituciones(this.empresaRow.id);
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
    this.titleForm = 'Agregar tipo institución';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.tipoInstitucionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param tipoInstitucion row de la tabla
   * @returns void
   */
  editRow(tipoInstitucion: TipoInstitucion): void {
    this.isEdit = true;
    this.titleForm = 'Editar tipo institución';
    this.tipoInstitucionSelect = tipoInstitucion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param tipoInstitucion row de la tabla
   * @returns void
   */
  deleteRow(tipoInstitucion: TipoInstitucion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este tipo institución <b>${tipoInstitucion.destip}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tipoInstitucionesDepositoService.delete(tipoInstitucion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el tipo institución, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el tipo institución.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
