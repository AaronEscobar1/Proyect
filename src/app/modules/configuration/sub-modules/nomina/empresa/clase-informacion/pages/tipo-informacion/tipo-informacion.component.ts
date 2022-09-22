import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { TipoInformacion } from '../../interfaces/tipo-informacion.interfaces';
import { TipoInformacionService } from '../../services/tipo-informacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { ClaseInformacion } from '../../interfaces/clase-informacion.interfaces';
import { DataTableTipoInfoComponent } from '../../components/tipo-informacion/data-table-tipo-info/data-table-tipo-info.component';

@Component({
  selector: 'app-tipo-informacion',
  templateUrl: './tipo-informacion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoInformacionComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de clase informacion seleccionado para obtener el id
  @Input() claseInformacionSelect!: ClaseInformacion | undefined;

  // Habilitar y deshabilitar botones
  @Input() buttonDisabled: boolean = true;
  
  // Objeto para mostrar todos los tipos de información por empresa y clase de información
  @Input() tiposInformaciones: TipoInformacion[] = [];
  
  // Objeto tipo de información seleccionado de la tabla
  tipoInformacionSelect: TipoInformacion | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tipo de información';
  createModal: boolean = false;
  printModal : boolean = false;

  // Emisión de eventos (refresh data)
  @Output() onRefreshData = new EventEmitter();

  // Emisión de evento de padre a hijo (resetear tabla clase de informacion)
  @ViewChild(DataTableTipoInfoComponent) dataTableTipoInfoComponent!: DataTableTipoInfoComponent;

  constructor(private companyNominaService: CompanyNominaService,
              private tipoInformacionService: TipoInformacionService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  /**
   * Reestablecer tabla tipo de información
   */
  resetTablaTipoInfo() {
    this.dataTableTipoInfoComponent.table._selection = null;
  }

  refresh(): void {
    this.onRefreshData.emit();
  }

  /**
   * Abre modal para crear
   * @returns void
   */
  openModalCreate(): void {
    this.titleForm = 'Agregar tipo de información';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.tipoInformacionSelect = undefined;
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param tipoInformacion row de la tabla
   * @returns void
   */
   editRow(tipoInformacion: TipoInformacion): void {
    this.isEdit = true;
    this.titleForm = 'Editar tipo de información';
    this.tipoInformacionSelect = tipoInformacion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param tipoInformacion row de la tabla
   * @returns void
   */
  deleteRow(tipoInformacion: TipoInformacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este tipo de información <b>${tipoInformacion.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tipoInformacionService.delete(tipoInformacion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar este tipo de información, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar este tipo de información.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
