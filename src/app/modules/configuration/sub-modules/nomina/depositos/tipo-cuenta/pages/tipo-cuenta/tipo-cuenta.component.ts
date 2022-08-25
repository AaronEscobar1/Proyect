import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoCuenta } from '../../interaces/tipo-cuenta.interfaces';
import { TipoCuentaService } from '../../services/tipo-cuenta.service';

@Component({
  selector: 'app-tipo-cuenta',
  templateUrl: './tipo-cuenta.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoCuentaComponent implements OnInit {

  // Objeto tipos de cuentas
  tiposCuentas: TipoCuenta[] = [];

  // Objeto seleccionado para editar
  tipoCuentaSelect: TipoCuenta | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tipo cuenta';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private tipoCuentaService: TipoCuentaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.tipoCuentaService.getAll()
      .subscribe({
        next: (res) => {
          this.tiposCuentas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.tiposCuentas = [];
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
    this.titleForm = 'Agregar tipo de cuenta';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.tipoCuentaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param tipoCuenta row de la tabla
   * @returns void
   */
  editRow(tipoCuenta: TipoCuenta): void {
    this.isEdit = true;
    this.titleForm = 'Editar tipo de cuenta';
    this.tipoCuentaSelect = tipoCuenta;
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param tipoCuenta row de la tabla
   * @returns void
   */
  deleteRow(tipoCuenta: TipoCuenta) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este tipo de cuenta <b>${tipoCuenta.descta}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tipoCuentaService.delete(tipoCuenta.tipcta)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar este tipo de cuenta.', life: 3000});
            }
          });
      }
    });
  }

}
