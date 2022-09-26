import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ValoresTabuladorService } from '../../services/valores-tabulador.service';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { Grados } from '../../interfaces/grados-tabuladores.interfaces';

@Component({
  selector: 'app-valores-tabuladores',
  templateUrl: './valores-tabulador.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ValoresTabuladorComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Variable para seleccionar el sueldo
  @Input() sueldoSelect!: string;
  
  // Objeto de grados por tabulador     
  gradosTabulador: Grados[] = [];

  // Objeto seleccionado para editar
  gradoTabuladorSelect!: Grados | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar grado por tabulador';
  createModal: boolean = false;
  printModal : boolean = false;

  // Emisión de evento (cargar data de Grados por tabulador)
  @Output() onDataGrados = new EventEmitter();

  constructor(private companyNominaService: CompanyNominaService,
              private valoresTabuladoresService: ValoresTabuladorService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService ) { }

  ngOnInit(): void {
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
    this.spinner.show(undefined, spinnerLight);
    this.valoresTabuladoresService.getAll(idEmpresa)
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
        this.valoresTabuladoresService.delete(valorGrado.eoGradoTbId.id, valorGrado.eoGradoTbId.idEmpresa)
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

}
