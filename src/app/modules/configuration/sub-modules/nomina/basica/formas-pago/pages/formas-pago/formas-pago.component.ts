import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormasPagoService } from '../../services/formas-pago.service';
import { FormasPago } from '../../interfaces/formas-pago.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class FormasPagoComponent implements OnInit {

  // Objetos de formas de pago
  formasPagos: FormasPago[] = [];

  // Objeto seleccionado para editar
  formaPagoSelect!: FormasPago | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar forma de pago';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private formasPagoService: FormasPagoService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Cargar formas de pago
   */
  loadData() {
    this.spinner.show();
    this.formasPagoService.getAll()
      .subscribe({
        next: (resp) => {
          this.formasPagos = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.formasPagos = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar forma de pago' : 'Agregar forma de pago';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.formaPagoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param formasPago row de la tabla
   * @returns void
   */
  editRow(formasPago: FormasPago): void {
    this.isEdit = true;
    this.formaPagoSelect = formasPago;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param formasPago row de la tabla
   * @returns void
   */
  deleteRow(formasPago: FormasPago): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta forma de pago <b>${formasPago.despag}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.formasPagoService.delete(formasPago)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la forma de pago.', life: 3000});
            }
          });
      }
    });
  }

}
