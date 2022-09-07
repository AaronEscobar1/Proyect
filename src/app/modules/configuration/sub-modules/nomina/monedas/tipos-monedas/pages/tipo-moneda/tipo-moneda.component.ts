import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoMoneda } from '../../interfaces/tipo-moneda.interfaces';
import { TipoMonedaService } from '../../services/tipo-moneda.service';

@Component({
  selector: 'app-tipo-moneda',
  templateUrl: './tipo-moneda.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoMonedaComponent implements OnInit {

  // Objeto tipos de monedas
  tiposMonedas: TipoMoneda[] = [];

  // Objeto seleccionado para editar
  tipoMonedaSelect: TipoMoneda | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tipo de moneda';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private tipoMonedaService: TipoMonedaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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

  refresh(): void {
    this.tiposMonedas = [];
    this.loadData();
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
    this.titleForm = 'Agregar tipo de moneda';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.tipoMonedaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param tipoMoneda row de la tabla
   * @returns void
   */
  editRow(tipoMoneda: TipoMoneda): void {
    this.isEdit = true;
    this.titleForm = 'Editar tipo de moneda';
    this.tipoMonedaSelect = tipoMoneda;
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param tipoMoneda row de la tabla
   * @returns void
   */
  deleteRow(tipoMoneda: TipoMoneda) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este tipo de moneda <b>${tipoMoneda.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tipoMonedaService.delete(tipoMoneda.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el tipo de moneda, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar este tipo de moneda.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
