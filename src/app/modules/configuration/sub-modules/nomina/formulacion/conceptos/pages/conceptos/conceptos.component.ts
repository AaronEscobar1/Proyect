import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Concepto } from '../../interfaces/concepto.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../services/conceptos.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TablasTipoConceptoService } from '../../services/tablas-tipo-concepto.service';
import { MetodoFiscal, RutinaCalculo, TipoCalculo, ManejoDecimal, TipoSalario, Promedio, DiaSemana, FechaAniversario } from '../../interfaces/tablas-tipos-concepto.interfaces';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ConceptosComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de conceptos por empresa y nomina
  @Input() conceptos: Concepto[] = [];

  // Objeto de conceptos que manejan saldos
  @Input() conceptosFilters: Concepto[] = [];

  // Objeto seleccionado para editar
  conceptoSelect!: Concepto | undefined;

  // Objeto de tipos de salarios
  @Input() tiposSalarios: TipoSalario[] = [];

  // Objeto de promedios
  @Input() promedios: Promedio[] = [];

  // Emisión de evento (cargar data de conceptos)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar concepto';
  createModal: boolean = false;
  printModal : boolean = false;

  /****************************
   *  Objetos de tablas tipos *
   ****************************/

  // Objeto de tipo de cálculos
  tiposCalculos: TipoCalculo[] = [];

  // Objeto de métodos Fiscales
  metodosFiscales: MetodoFiscal[] = [];

  // Objeto de rutinas de Cálculos
  rutinasCalculos: RutinaCalculo[] = [];
  
  // Objeto de manejos decimales (redondeo)
  manejosDecimales: ManejoDecimal[] = [];

  // Objeto de dias semanas
  diasSemanas: DiaSemana[] = [];

  // Objeto de tipos fechas Aniversario
  fechasAniversario: FechaAniversario[] = [];
  
  constructor(private companyNominaService: CompanyNominaService,
              private conceptosService: ConceptosService,
              private tablasTipoConceptoService: TablasTipoConceptoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadTiposCalculos();
    this.loadMetodosFiscales();
    this.loadRutinasCalculos();
    this.loadManejoDecimales();
    this.loadDiasSemanas();
    this.loadTiposFechasAniversario();
  }

  refresh(): void {
    this.conceptos = [];
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
    this.titleForm = 'Agregar concepto';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.conceptoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param concepto row de la tabla
   * @returns void
   */
   editRow(concepto: Concepto): void {
    this.isEdit = true;
    this.titleForm = 'Editar concepto';
    this.conceptoSelect = concepto;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param concepto row de la tabla
   * @returns void
   */
  deleteRow(concepto: Concepto): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este concepto <b>${concepto.descto}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.conceptosService.delete(concepto)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el concepto, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el concepto.', life: 3000});
              return false;
            }
          });
      }
    });
  }

  /**
   * Cargar tablas tipos
   */

  /** Tipos de Cálculos */
  loadTiposCalculos(): void {
    this.tablasTipoConceptoService.getAllTiposCalculos()
      .subscribe({
        next: (res: TipoCalculo[]) => {
          this.tiposCalculos = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener los tipos de cálculos, error conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Métodos Fiscales */
  loadMetodosFiscales(): void {
    this.tablasTipoConceptoService.getAllMetodosFiscales()
      .subscribe({
        next: (res: MetodoFiscal[]) => {
          this.metodosFiscales = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener los métodos fiscales, error conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Rutinas de Cálculos */
  loadRutinasCalculos(): void {
    this.tablasTipoConceptoService.getAllRutinasCalculos()
      .subscribe({
        next: (res: RutinaCalculo[]) => {
          this.rutinasCalculos = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener las rutinas de cálculos, error conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Manejos Decimales (Redondeo) */
  loadManejoDecimales(): void {
    this.tablasTipoConceptoService.getAllManejosDecimales()
      .subscribe({
        next: (res: ManejoDecimal[]) => {
          this.manejosDecimales = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener las manejos decimales, error conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Días de Semana */
  loadDiasSemanas(): void {
    this.tablasTipoConceptoService.getAllDiasSemana()
      .subscribe({
        next: (res: DiaSemana[]) => {
          this.diasSemanas = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener los días de semana, error conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Tipos fechas Aniversario */
  loadTiposFechasAniversario(): void {
    this.tablasTipoConceptoService.getAllTiposFechasAniversario()
      .subscribe({
        next: (res: FechaAniversario[]) => {
          this.fechasAniversario = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener los días de semana, error conexión con el servidor.', life: 3000});
        }
      });
  }

}
