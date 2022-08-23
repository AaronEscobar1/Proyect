import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { NivelExcepcion } from '../../interfaces/niveles-excepcion.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { NivelesExcepcionService } from '../../services/niveles-excepcion.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-niveles-excepcion',
  templateUrl: './niveles-excepcion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class NivelesExcepcionComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de niveles de excepción por empresa y nomina
  @Input() nivelesExcepcion: NivelExcepcion[] = [];

  // Objeto seleccionado para editar
  nivelExcepcionSelect!: NivelExcepcion | undefined;

  // Emisión de evento (cargar data de niveles de excepción)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar nivel de excepción';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private nivelesExcepcionService: NivelesExcepcionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  refresh(): void {
    this.nivelesExcepcion = [];
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
    this.titleForm = 'Agregar nivel de excepción';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.nivelExcepcionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param nivelExcepcion row de la tabla
   * @returns void
   */
   editRow(nivelExcepcion: NivelExcepcion): void {
    this.isEdit = true;
    this.titleForm = 'Editar nivel de excepción';
    this.nivelExcepcionSelect = nivelExcepcion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param nivelExcepcion row de la tabla
   * @returns void
   */
  deleteRow(nivelExcepcion: NivelExcepcion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este nivel de excepción <b>${nivelExcepcion.desniv}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.nivelesExcepcionService.delete(nivelExcepcion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el nivel de excepción, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el nivel de excepción.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
