import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GradosTabuladorService } from '../../services/grados-tabulador.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { Grados } from '../../interfaces/grados-tabuladores.interfaces';
import { ValorGrado } from '../../interfaces/valores-tabuladores.interfaces';
import { ValoresGradosTabuladorComponent } from '../valores-grados-tabulador/valores-grados-tabulador.component';
import { Subscription } from 'rxjs';
import { ValoresGradoTabuladorService } from '../../services/valores-grado-tabulador.service';
import { DataTableComponent } from '../../components/grados-tabulador/data-table/data-table.component';

@Component({
  selector: 'app-grados-tabuladores',
  templateUrl: './grados-tabulador.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class GradosTabuladorComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Variable para seleccionar el sueldo
  @Input() sueldoSelect!: string;
  
  // Objeto de grados por tabulador     
  gradosTabulador: Grados[] = [];

  // Objeto seleccionado para editar
  gradoTabuladorSelect!: Grados | undefined;

  // Objeto de valores grados por tabulador
  valoresGrados: ValorGrado[] = [];

  // Habilitar y deshabilitar botones
  buttonDisabled: boolean = true;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar grado por tabulador';
  createModal: boolean = false;
  printModal : boolean = false;

  // Emisión de evento (cargar data de Grados por tabulador)
  @Output() onDataGrados = new EventEmitter();

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  // Emisión de evento de padre a hijo (resetear tabla grados tabuladores)
  @ViewChild(DataTableComponent) dataTableComponent!: DataTableComponent;
  // Emisión de evento de padre a hijo (resetear tabla valores grados tabulador)
  @ViewChild(ValoresGradosTabuladorComponent) valoresGradosTabuladorComponent!: ValoresGradosTabuladorComponent;

  constructor(private gradosTabuladorService: GradosTabuladorService,
              private valoresGradoTabuladorService: ValoresGradoTabuladorService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService ) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable grados por tabulador
    this.subscriber = this.gradosTabuladorService.selectRowGrado$.subscribe( (row: Grados) => {
      this.gradoTabuladorSelect = row;
      this.loadValoresGrados();
    });
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Limpia el row de la tabla de distribucion nomina
      this.selectRowService.selectRowAlterno$.emit(null);
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadValoresTabuladores(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de parametros asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadValoresTabuladores( idEmpresa: string ) {
    this.resetTablaGradosTabulador();
    this.spinner.show(undefined, spinnerLight);
    this.gradosTabuladorService.getAll(idEmpresa)
      .subscribe({
        next: (res) => {
          this.gradosTabulador = res;
          // Emite el valor de grados por tabulador para enviarlo al componente hermano de cargos por tabulador
          this.onDataGrados.emit(this.gradosTabulador);
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
        }
      });
  }

  /**
   * Obtener los tipos de información por empresa y clase de información
   */
  loadValoresGrados(): void {
    this.valoresGrados = [];
    if ( !this.gradoTabuladorSelect ) {
      return;
    }
    this.spinner.show(undefined, spinnerLight);
    this.valoresGradoTabuladorService.getValoresGradosByGrado(this.gradoTabuladorSelect.eoGradoTbId.idEmpresa, this.gradoTabuladorSelect.eoGradoTbId.id)
      .subscribe({
        next: (res: ValorGrado[]) => {
          this.valoresGrados = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Metodo para habilitar y deshabilitar los botones si esta seleccionada el grado tabulador
   * @param event: boolean
   */
  disableButtons(event: boolean): void {
    this.buttonDisabled = event;
  }

  /**
   * Reestablecer valores de grados tabulador y vaciar tabla Valores grados
   */
  resetTablaGradosTabulador() {
    this.gradosTabulador = [];
    this.dataTableComponent.table._selection = null;
    this.dataTableComponent.onRowUnselect();
  }

  /**
   * Reestablecer tabla valores grados
   */
  resetTablaValoresGrados() {
    this.valoresGradosTabuladorComponent.resetTablaValoresGrados();
  }

  refresh(): void {
    this.gradosTabulador = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadValoresTabuladores(this.empresaRow.id);
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
    this.titleForm = 'Agregar grado por tabulador';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.gradoTabuladorSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param valoresGrados row de la tabla
   * @returns void
   */
  editRow(valoresGrados: Grados): void {
    this.isEdit = true;
    this.titleForm = 'Editar grado por tabulador';
    this.gradoTabuladorSelect = valoresGrados;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param valoresGrados row de la tabla
   * @returns void
   */
  deleteRow(valorGrado: Grados): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este grado de tabulador <b>${valorGrado.descrip}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.gradosTabuladorService.delete(valorGrado.eoGradoTbId.id, valorGrado.eoGradoTbId.idEmpresa)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.gradosTabuladorService.selectRowGrado$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la valor de tabulador, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la valor de tabulador.', life: 3000});
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
