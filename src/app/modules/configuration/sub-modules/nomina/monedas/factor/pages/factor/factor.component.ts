import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { FactorConversion } from '../../interfaces/factor.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { FactorService } from '../../services/factor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { TipoMonedaService } from '../../../tipos-monedas/services/tipo-moneda.service';
import { TipoMoneda } from '../../../tipos-monedas/interfaces/tipo-moneda.interfaces';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class FactorComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de clases de informaciones por empresa
  factoresConversion: FactorConversion[] = [];

  // Objeto seleccionado para editar
  factorConversionSelect!: FactorConversion | undefined;

  // Objeto tipos de monedas
  tiposMonedas: TipoMoneda[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar factor de conversión';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoMonedaService: TipoMonedaService,
              private factorService: FactorService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadTiposMonedas();
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadFactoresConversion(this.empresaRow.id);
    }
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

  /**
   * Obtener datos de factores de conversiones asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadFactoresConversion( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.factorService.getFactoresConversionByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.factoresConversion = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.factoresConversion = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadFactoresConversion(this.empresaRow.id);
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
    this.titleForm = 'Agregar factor de conversión';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.factorConversionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param factorConversion row de la tabla
   * @returns void
   */
  editRow(factorConversion: FactorConversion): void {
    this.isEdit = true;
    this.titleForm = 'Editar factor de conversión';
    this.factorConversionSelect = factorConversion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param factorConversion row de la tabla
   * @returns void
   */
  deleteRow(factorConversion: FactorConversion): void {
    factorConversion.fvigencia = `${new Date(factorConversion.fvigencia).toISOString().slice(0, 10)}T10:10:10`;
    this.confirmationService.confirm({
      message: `¿Desea eliminar este factor de conversión?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.factorService.delete(factorConversion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar este factor de conversión, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar este factor de conversión.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
