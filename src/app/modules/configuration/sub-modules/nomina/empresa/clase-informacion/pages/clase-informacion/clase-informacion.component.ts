import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { ClaseInformacionService } from '../../services/clase-informacion.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { ClaseInformacion, Equivalencia } from '../../interfaces/clase-informacion.interfaces';
import { Subscription } from 'rxjs';
import { TipoInformacionService } from '../../services/tipo-informacion.service';
import { TipoInformacion } from '../../interfaces/tipo-informacion.interfaces';
import { DataTableClaseInfoComponent } from '../../components/clase-informacion/data-table-clase-info/data-table-clase-info.component';
import { TipoInformacionComponent } from '../tipo-informacion/tipo-informacion.component';

@Component({
  selector: 'app-clase-informacion',
  templateUrl: './clase-informacion.component.html',
  styleUrls: ['clase-informacion.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class ClaseInformacionComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de clases de informaciones por empresa
  clasesInformacion: ClaseInformacion[] = [];

  // Objeto clase de información seleccionada desde la tabla
  claseInformacionSelect!: ClaseInformacion | undefined;

  // Objeto de equivalencias
  equivalencias: Equivalencia[] = [];

  // Objeto tipos de información
  tiposInformaciones: TipoInformacion[] = [];

  // Habilitar y deshabilitar botones
  buttonDisabled: boolean = true;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar clase de información';
  createModal: boolean = false;
  printModal : boolean = false;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  // Emisión de evento de padre a hijo (resetear tabla clase de informacion)
  @ViewChild(DataTableClaseInfoComponent) dataTableClaseInfoComponent!: DataTableClaseInfoComponent;
  // Emisión de evento de padre a hijo (resetear tabla tipo de informacion)
  @ViewChild(TipoInformacionComponent) tipoInformacionComponent!: TipoInformacionComponent;

  constructor(private claseInformacionService: ClaseInformacionService,
              private tipoInformacionService: TipoInformacionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadEquivalencias();
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipos de moneda
    this.subscriber = this.claseInformacionService.selectRowClaseInformacion$.subscribe( (row: ClaseInformacion) => {
      this.claseInformacionSelect = row;
      this.loadTiposInformacion();
    });
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadClasesInformacion(this.empresaRow.id);
    }
  }

  /**
   * Carga todas las equivalencias
   */
  loadEquivalencias(): void {
    this.spinner.show();
    this.claseInformacionService.getEquivalencias()
      .subscribe({
        next: (resp) => {
          this.equivalencias = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener datos de clases de informacion asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadClasesInformacion( idEmpresa: string ): void {
    this.resetTablaClaseTipoInfo();
    this.spinner.show(undefined, spinnerLight);
    this.claseInformacionService.getClasesInformacionByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.clasesInformacion = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener los tipos de información por empresa y clase de información
   */
  loadTiposInformacion(): void {
    this.tiposInformaciones = [];
    if ( !this.claseInformacionSelect ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.tipoInformacionService.getTiposInformacionByEmpresaAndClase(this.claseInformacionSelect.nmInformacionClaseTbId.idEmpresa, this.claseInformacionSelect.nmInformacionClaseTbId.id)
      .subscribe({
        next: (res: TipoInformacion[]) => {
          this.tiposInformaciones = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Metodo para habilitar y deshabilitar los botones si esta seleccionada la clase de información
   * @param event: boolean
   */
  disableButtons(event: boolean): void {
    this.buttonDisabled = event;
  }
  
  /**
   * Reestablecer valores de tipo moneda y vaciar tabla de denominaciones Monedas
   */
  resetTablaClaseTipoInfo() {
    this.clasesInformacion = [];
    this.dataTableClaseInfoComponent.table._selection = null;
    this.dataTableClaseInfoComponent.onRowUnselect();
  }

  /**
   * Reestablecer tabla tipo de información
   */
  resetTablaTipoInfo() {
    this.tipoInformacionComponent.resetTablaTipoInfo();
  }

  refresh(): void {
    this.clasesInformacion = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadClasesInformacion(this.empresaRow.id);
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
    this.titleForm = 'Agregar clase de información';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.claseInformacionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param claseInformacion row de la tabla
   * @returns void
   */
  editRow(claseInformacion: ClaseInformacion): void {
    this.isEdit = true;
    this.titleForm = 'Editar clase de información';
    this.claseInformacionSelect = claseInformacion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param claseInformacion row de la tabla
   * @returns void
   */
  deleteRow(claseInformacion: ClaseInformacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta clase de Informacion <b>${claseInformacion.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.claseInformacionService.delete(claseInformacion)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.claseInformacionService.selectRowClaseInformacion$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la clase de Informacion, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la clase de Informacion.', life: 3000});
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
