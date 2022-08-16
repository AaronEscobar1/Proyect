import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TarifasImpuestosService } from '../../services/tarifas-impuestos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FrecuenciaImpuesto, TarifaImpuesto, TipoTarifa } from '../../interfaces/tarifas-impuestos.interfaces';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';

@Component({
  selector: 'app-tarifas-impuestos',
  templateUrl: './tarifas-impuestos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TarifasImpuestosComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de tarifas de impuestos por empresa
  tarifasImpuestos: TarifaImpuesto[] = [];

  // Objeto seleccionado para editar
  tarifaImpuestoSelect!: TarifaImpuesto | undefined;

  // Objeto de tipos tarifas de impuesto
  tiposTarifas: TipoTarifa[] = [];
  // Objeto de tipos tarifas de impuesto para filtrar en tabla
  tiposTarifasFilter: dropdownType[] = [];

  // Objeto de frecuencia de impuesto
  frecuenciasImpuesto: FrecuenciaImpuesto[] = [];
  // Objeto de frecuencia de impuesto para filtrar en tabla
  frecuenciasImpuestoFilter: dropdownType[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tarifa de impuesto';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private tarifasImpuestosService: TarifasImpuestosService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadTiposTarifas();
    this.loadFrecuenciaTarifas();
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadTarifas(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de tarifas de impuesto asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadTarifas(idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.tarifasImpuestosService.getAllTarifasByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.tarifasImpuestos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  loadTiposTarifas(): void {
    this.spinner.show();
    this.tarifasImpuestosService.getTiposTarifas()
      .subscribe({
        next: (res) => {
          this.tiposTarifas = res;
          // Transformo el array de objetos para poder filtar en la datable
          this.tiposTarifasFilter = this.tiposTarifas.map(dato => { return { label: dato.descripcion, value: dato.tipreg } });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  loadFrecuenciaTarifas(): void {
    this.spinner.show();
    this.tarifasImpuestosService.getFrecuenciasImpuestos()
      .subscribe({
        next: (res) => {
          this.frecuenciasImpuesto = res;
          // Transformo el array de objetos para poder filtar en la datable
          this.frecuenciasImpuestoFilter = this.frecuenciasImpuesto.map(dato => { return { label: dato.descripcion, value: dato.frecue } });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.tarifasImpuestos = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadTarifas(this.empresaRow.id);
    }
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    this.titleForm = 'Agregar tarifa de impuesto';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.tarifaImpuestoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param tarifaImpuesto row de la tabla
   * @returns void
   */
  editRow(tarifaImpuesto: TarifaImpuesto): void {
    this.isEdit = true;
    this.titleForm = 'Editar tarifa de impuesto';
    this.tarifaImpuestoSelect = tarifaImpuesto;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param tarifaImpuesto row de la tabla
   * @returns void
   */
  deleteRow(tarifaImpuesto: TarifaImpuesto): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta tarifa de impuesto?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tarifasImpuestosService.delete(tarifaImpuesto)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el centro de trabajo, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la tarifa de impuesto.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
