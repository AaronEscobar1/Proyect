import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { Institucion } from '../../interfaces/instituciones.interfaces';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { InstitucionesService } from '../../services/instituciones.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Countrys } from 'src/app/shared/interfaces/country-entity.interfaces';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { TipoInstitucionesDepositoService } from '../../../tipo-instituciones-deposito/services/tipo-instituciones-deposito.service';
import { TipoInstitucion } from '../../../tipo-instituciones-deposito/interfaces/tipo-instituciones-deposito.interfaces';
import { TipoCuentaService } from '../../../tipo-cuenta/services/tipo-cuenta.service';
import { TipoCuenta } from '../../../tipo-cuenta/interaces/tipo-cuenta.interfaces';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class InstitucionesComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de instituciones por empresa
  instituciones: Institucion[] = [];

  // Objeto seleccionado para editar
  institucionSelect!: Institucion | undefined;

  // Objeto tipos instituciones
  tiposInstituciones: TipoInstitucion[] = [];

  // Objeto para cargar paises
  countrys: Countrys[] = [];

  // Objeto para tipos de cuentas
  tiposCuentas: TipoCuenta[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar institución';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private institucionesService: InstitucionesService,
              private tipoInstitucionesDepositoService: TipoInstitucionesDepositoService,
              private tipoCuentaService: TipoCuentaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadCountrysData();
    this.loadTiposCuentas();
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadInstituciones(this.empresaRow.id);
    }
  }

  /**
   * Carga todos los países
   */
  loadCountrysData(): void {
    this.spinner.show();
    this.companyNominaService.getAllCountry()
      .subscribe({
        next: (resp) => {
          this.countrys = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Carga tipos de cuentas
   */
  loadTiposCuentas(): void {
    this.spinner.show();
    this.tipoCuentaService.getAll()
      .subscribe({
        next: (resp) => {
          this.tiposCuentas = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener datos de instituciones asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadInstituciones( idEmpresa: string, isRefresh: boolean = false ): void {
    this.instituciones = [];
    this.spinner.show(undefined, spinnerLight);
    this.institucionesService.getInstitucionesByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.instituciones = res;
          this.spinner.hide();
          // Realizar peticion al backend para buscar los tipos de instituciones cuando no es por metodo refresh
          if (!isRefresh) {
            this.loadTiposInstituciones(this.empresaRow.id);
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
    }
    
  /**
   * Obtener datos de tipos instituciones asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadTiposInstituciones( idEmpresa: string ):  void {
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

  refresh(): void {
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadInstituciones(this.empresaRow.id, true);
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
    this.titleForm = 'Agregar institución';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.institucionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param institucion row de la tabla
   * @returns void
   */
  editRow(institucion: Institucion): void {
    this.isEdit = true;
    this.titleForm = 'Editar institución';
    this.institucionSelect = institucion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param institucion row de la tabla
   * @returns void
   */
  deleteRow(institucion: Institucion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta institución <b>${institucion.desins}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.institucionesService.delete(institucion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la institución, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la institución.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
