import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { MonedaNomina } from '../../interfaces/moneda-nomina.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { MonedaNominaService } from '../../services/moneda-nomina.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoMonedaService } from '../../../tipos-monedas/services/tipo-moneda.service';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';

@Component({
  selector: 'app-moneda-nomina',
  templateUrl: './moneda-nomina.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class MonedaNominaComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de monedas nóminas
  @Input() monedasNominas: MonedaNomina[] = [];

  // Objeto seleccionado para editar
  monedaNominaSelect!: MonedaNomina | undefined;

  // Objeto tipos de monedas
  tiposMonedas: TipoMoneda[] = [];

  // Emisión de evento (cargar data de monedas nóminas)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar moneda a nómina';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoMonedaService: TipoMonedaService,
              private monedaNominaService: MonedaNominaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadTiposMonedas();
  }

  /**
   * Cargar tipos de monedas
   */
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

  refresh(): void {
    this.monedasNominas = [];
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
    this.titleForm = 'Agregar moneda a nómina';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.monedaNominaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param MonedaNomina row de la tabla
   * @returns void
   */
   editRow(monedaNomina: MonedaNomina): void {
    this.isEdit = true;
    this.titleForm = 'Editar moneda a nómina';
    this.monedaNominaSelect = monedaNomina;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param monedaNomina row de la tabla
   * @returns void
   */
  deleteRow(monedaNomina: MonedaNomina): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta moneda nómina?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.monedaNominaService.delete(monedaNomina)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la moneda nómina, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la moneda nómina.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
