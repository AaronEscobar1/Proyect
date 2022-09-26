import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { DataTableValoresComponent } from '../../components/valores-grados-tabuladores/data-table-valores/data-table-valores.component';
import { Grados } from '../../interfaces/grados-tabuladores.interfaces';
import { ValorGrado } from '../../interfaces/valores-tabuladores.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { ValoresGradoTabuladorService } from '../../services/valores-grado-tabulador.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-valores-grados-tabulador',
  templateUrl: './valores-grados-tabulador.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ValoresGradosTabuladorComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de grado tabulador seleccionado para obtener el id
  @Input() gradoTabuladorSelect!: Grados | undefined;

  // Habilitar y deshabilitar botones
  @Input() buttonDisabled: boolean = true;
    
  // Variable para seleccionar el sueldo
  @Input() sueldoSelect!: string;

  // Objeto para mostrar valores de grados por tabulador
  @Input() valoresGrados: ValorGrado[] = [];

  // Variable de valor grado seleccionado de la tabla
  valorGradoSelect: ValorGrado | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar valor de grado';
  createModal: boolean = false;
  printModal : boolean = false;

  // Emisión de eventos (refresh data)
  @Output() onRefreshData = new EventEmitter();

  // Emisión de evento de padre a hijo (resetear tabla valores grados tabulador)
  @ViewChild(DataTableValoresComponent) dataTableValoresComponent!: DataTableValoresComponent;

  constructor(private companyNominaService: CompanyNominaService,
              private valoresGradoTabuladorService: ValoresGradoTabuladorService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  /**
   * Reestablecer tabla valores grados tabulador
   */
  resetTablaValoresGrados() {
    this.dataTableValoresComponent.table._selection = null;
  }

  refresh(): void {
    this.onRefreshData.emit();
  }

  /**
   * Abre modal para crear
   * @returns void
   */
  openModalCreate(): void {
    this.titleForm = 'Agregar valor de grado';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.valorGradoSelect = undefined;
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param valorGrado row de la tabla
   * @returns void
   */
   editRow(valorGrado: ValorGrado): void {
    this.isEdit = true;
    this.titleForm = 'Editar valor de grado';
    this.valorGradoSelect = valorGrado;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param valorGrado row de la tabla
   * @returns void
   */
  deleteRow(valorGrado: ValorGrado): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este valor de grado?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.valoresGradoTabuladorService.delete(valorGrado)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar este valor de grado, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar este valor de grado.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
