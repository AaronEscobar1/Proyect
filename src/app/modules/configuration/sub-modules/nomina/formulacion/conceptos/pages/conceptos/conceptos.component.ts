import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Concepto } from '../../interfaces/concepto.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { ConceptosService } from '../../services/conceptos.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

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

  // Objeto seleccionado para editar
  conceptoSelect!: Concepto | undefined;

  // Emisión de evento (cargar data de conceptos)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar concepto';
  createModal: boolean = false;
  printModal : boolean = false;
  
  constructor(private companyNominaService: CompanyNominaService,
              private conceptosService: ConceptosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
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

}
