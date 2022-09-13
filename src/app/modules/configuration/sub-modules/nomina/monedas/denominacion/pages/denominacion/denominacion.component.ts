import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TipoMonedaService } from '../../../tipos-monedas/services/tipo-moneda.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';
import { Subscription } from 'rxjs';
import { DenominacionService } from '../../services/denominacion.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { DenominacionMoneda } from '../../interfaces/denominacion-moneda.interfaces';
import { DataTableMonedasComponent } from '../../components/data-table-monedas/data-table-monedas.component';
import { DataTableDenominacionComponent } from '../../components/data-table-denominacion/data-table-denominacion.component';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-denominacion',
  templateUrl: './denominacion.component.html',
  styleUrls: ['denominacion.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DenominacionComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;
  
  // Objeto tipos de monedas
  tiposMonedas: TipoMoneda[] = [];

  // Tipo moneda seleccionada desde la tabla
  tipoMonedaRow!: TipoMoneda;

  // Objeto de denominaciones o familia de monedas
  denominacionesMonedas: DenominacionMoneda[] = [];

  // Objeto denominaciones seleccionado de la tabla
  denominacionMonedaSelect: DenominacionMoneda | undefined;

  // Habilitar y deshabilitar botones
  buttonDisabled: boolean = true;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar denominación de moneda';
  createModal: boolean = false;
  printModal : boolean = false;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  // Emisión de evento de padre a hijo (resetear tabla tipo de moneda)
  @ViewChild(DataTableMonedasComponent) dataTableMonedasComponent!: DataTableMonedasComponent;
  // Emisión de evento de padre a hijo (resetear tabla denominación)
  @ViewChild(DataTableDenominacionComponent) dataTableDenominacionComponent!: DataTableDenominacionComponent;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoMonedaService: TipoMonedaService,
              private denominacionService: DenominacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadTiposMonedas();
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipos de moneda
    this.subscriber = this.denominacionService.selectRowTipoMoneda$.subscribe( (row: TipoMoneda) => {
      this.tipoMonedaRow = row;
      this.loadDenominacionesMonedas();
    });
  }

  loadTiposMonedas() {
    this.spinner.show();
    this.tipoMonedaService.getAll()
      .subscribe({
        next: (res) => {
          this.tiposMonedas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener las denominaciones de monedas por empresa, tipo de nomina y tipo de moneda
   */
  loadDenominacionesMonedas(): void {
    this.denominacionesMonedas = [];
    if ( !this.tipoMonedaRow ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.denominacionService.getAllDenominacionesByEmpresaNominaTipoMoneda(this.empresaRow.id, this.nominaRow.tipnom, this.tipoMonedaRow.id)
      .subscribe({
        next: (res: DenominacionMoneda[]) => {
          this.denominacionesMonedas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Metodo para habilitar y deshabilitar los botones si esta seleccionada el tipo de moneda
   * @param event: boolean
   */
  disableButtons(event: boolean): void {
    this.buttonDisabled = event;
  }

  /**
   * Reestablecer valores de tipo moneda y vaciar tabla de denominaciones Monedas
   */
  resetTablaTipoMoneda() {
    this.denominacionesMonedas = [];
    this.dataTableMonedasComponent.table._selection = null;
    this.dataTableMonedasComponent.onRowUnselect();
  }

  /**
   * Reestablecer tabla de denominaciones Monedas
   */
  resetTablaDenominacion() {
    this.dataTableDenominacionComponent.table._selection = null;
  }

  refresh(): void {
    this.denominacionesMonedas = [];
    this.loadDenominacionesMonedas();
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
    this.titleForm = 'Agregar denominación de moneda';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.denominacionMonedaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param denominacionMoneda row de la tabla
   * @returns void
   */
  editRow(denominacionMoneda: DenominacionMoneda): void {
    this.isEdit = true;
    this.titleForm = 'Editar denominación de moneda';
    this.denominacionMonedaSelect = denominacionMoneda;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param denominacionMoneda row de la tabla
   * @returns void
   */
  deleteRow(denominacionMoneda: DenominacionMoneda): void {
    denominacionMoneda.fvigencia = `${new Date(denominacionMoneda.fvigencia).toISOString().slice(0, 10)}T10:10:10`;
    
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta denominación de moneda <b>${denominacionMoneda.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.denominacionService.delete(denominacionMoneda)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar esta denominación de moneda, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar esta denominación de moneda.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  /** Destrucción del observable */
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
