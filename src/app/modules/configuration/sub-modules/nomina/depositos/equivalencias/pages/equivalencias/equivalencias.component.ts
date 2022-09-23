import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { TipoInstitucionesDepositoService } from '../../../tipo-instituciones-deposito/services/tipo-instituciones-deposito.service';
import { EquivalenciasService } from '../../services/equivalencias.service';
import { TipoInstitucion, Institucion } from '../../../instituciones/interfaces/instituciones.interfaces';
import { DataTableTipoInstitucionComponent } from '../../components/data-table-tipo-institucion/data-table-tipo-institucion.component';
import { Subscription } from 'rxjs';
import { DataTableInstitucionesComponent } from '../../components/data-table-instituciones/data-table-instituciones.component';
import { EquivalenciaTipoCuenta } from '../../interfaces/equivalencias.interfaces';
import { DataTableEquivalenciasComponent } from '../../components/equivalencias/data-table-equivalencias/data-table-equivalencias.component';

@Component({
  selector: 'app-equivalencias',
  templateUrl: './equivalencias.component.html',
  styleUrls: ['equivalencias.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class EquivalenciasComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto tipos instituciones
  tiposInstituciones: TipoInstitucion[] = [];

  // Tipo institucion seleccionado desde la tabla
  tipoInstitucionRow!: TipoInstitucion;

  // Objeto de instituciones
  instituciones: Institucion[] = [];

  // Institucion seleccionada de la tabla
  institucionSelect: Institucion | undefined;

  // Objeto equivalencias tipos de cuentas
  equivalenciasCuentas: EquivalenciaTipoCuenta[] = [];

  // Equivalencia seleccionada de la tabla
  equivalenciaCuentaSelect: EquivalenciaTipoCuenta | undefined;

  // Habilitar y deshabilitar botones
  buttonDisabled: boolean = true;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar equivalencia';
  createModal: boolean = false;
  printModal : boolean = false;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  // Emisión de evento de padre a hijo (resetear tabla tipo de institucion)
  @ViewChild(DataTableTipoInstitucionComponent) dataTableTipoInstitucionComponent!: DataTableTipoInstitucionComponent;

  // Emisión de evento de padre a hijo (resetear tabla institución)
  @ViewChild(DataTableInstitucionesComponent) dataTableInstitucionesComponent!: DataTableInstitucionesComponent;

  // Emisión de evento de padre a hijo (resetear tabla equivalencia)
  @ViewChild(DataTableEquivalenciasComponent) dataTableEquivalenciasComponent!: DataTableEquivalenciasComponent;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoInstitucionesDepositoService: TipoInstitucionesDepositoService,
              private equivalenciasService: EquivalenciasService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo institucion
    this.subscriber = this.equivalenciasService.selectRowTipoInstitucion$.subscribe( (row: TipoInstitucion) => {
      this.tipoInstitucionRow = row;
      this.loadInstituciones();
    });
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable institucion
    this.subscriber = this.equivalenciasService.selectRowInstitucion$.subscribe( (row: Institucion) => {
      this.institucionSelect = row;
      this.loadEquivalenciasCuenta();
    });
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadTipoInstitucion(this.empresaRow.id);
    }
  }

  /**
   * Obtener tipos de institución asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadTipoInstitucion( idEmpresa: string ): void {
    this.tiposInstituciones = [];
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
   * Obtener instituciones por empresa y tipo de institución
   */
  loadInstituciones(): void {
    this.instituciones = [];
    if ( !this.tipoInstitucionRow ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.tipoInstitucionesDepositoService.getAllInstitucionesByTipoInstitucion(this.empresaRow.id, this.tipoInstitucionRow.codtip)
      .subscribe({
        next: (res: Institucion[]) => {
          this.instituciones = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener equivalencias por empresa, tipo de institución e institucion
   */
  loadEquivalenciasCuenta(): void {
    this.equivalenciasCuentas = [];
    if ( !this.institucionSelect ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.equivalenciasService.getAllEquivalenciasCuenta(this.institucionSelect)
      .subscribe({
        next: (res: EquivalenciaTipoCuenta[]) => {
          this.equivalenciasCuentas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Metodo para habilitar y deshabilitar los botones si esta seleccionada el tipo de institución
   * @param event: boolean
   */
  disableButtons(event: boolean): void {
    this.buttonDisabled = event;
  }

  /**
   * Reestablecer valores de tipo instituciones y vaciar tabla de institución
   */
  resetTablaTipoInstituciones() {
    // Vaciar seleccion de la tabla tipo instituciones
    this.dataTableTipoInstitucionComponent.table._selection = null;
    this.dataTableTipoInstitucionComponent.onRowUnselect();
  }

  /**
   * Reestablecer tabla de institución
   */
  resetTablaInstitucionEquivalencia() {
    this.equivalenciasCuentas = [];
    // Vaciar seleccion de la tabla instituciones
    this.dataTableInstitucionesComponent.table._selection = null;
    // Vaciar seleccion de la tabla equivalencias
    this.resetTablaEquivalencia();
  }

  /**
   * Reestablecer tabla de equivalencia
   */
  resetTablaEquivalencia() {
    // Vaciar seleccion de la tabla equivalencias
    this.dataTableEquivalenciasComponent.table._selection = null;
  }

  refresh(): void {
    this.equivalenciasCuentas = [];
    this.loadEquivalenciasCuenta();
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
    this.titleForm = 'Agregar equivalencia';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.equivalenciaCuentaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param equivalenciaTipoCuenta row de la tabla
   * @returns void
   */
  editRow(equivalenciaTipoCuenta: EquivalenciaTipoCuenta): void {
    this.isEdit = true;
    this.titleForm = 'Editar equivalencia';
    this.equivalenciaCuentaSelect = equivalenciaTipoCuenta;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param equivalenciaTipoCuenta row de la tabla
   * @returns void
   */
   deleteRow(equivalenciaTipoCuenta: EquivalenciaTipoCuenta): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta equivalencia?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.equivalenciasService.delete(equivalenciaTipoCuenta)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar esta equivalencia, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar esta equivalencia.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
