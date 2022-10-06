import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { MotivosCambios } from '../../interfaces/motivos-cambios.interfaces';
import { MotivosCambiosService } from '../../services/motivos-cambios.service';

@Component({
  selector: 'app-motivos-cambios',
  templateUrl: './motivos-cambios.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class MotivosCambiosComponent implements OnInit {

  // Objetos de motivos de cambios
  motivosCambios    : MotivosCambios[] = [];

  // Objeto seleccionado para editar
  motivoCambioSelect: MotivosCambios | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar motivo de cambio';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private motivosCambiosService: MotivosCambiosService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Cargar motivos de cambios
   */
  loadData() {
    this.spinner.show();
    this.motivosCambiosService.getAll()
      .subscribe({
        next: (res) => {
          this.motivosCambios = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.motivosCambios = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar motivo de cambio' : 'Agregar motivo de cambio';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.motivoCambioSelect = undefined;
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param motivosCambios row de la tabla
   * @returns void
   */
  editRow(motivosCambios: MotivosCambios): void {
    this.isEdit = true;
    this.motivoCambioSelect = motivosCambios;
    this.openModalCreate();
  }
  
  /**
   * Elimina un registro
   * @param motivoCambio row de la tabla
   * @returns void
   */
  deleteRow(motivoCambio: MotivosCambios) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el motivo de cambio <b>${motivoCambio.descam}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.motivosCambiosService.delete(motivoCambio.codcam)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el motivo de cambio.', life: 3000});
            }
          });
      }
    });
  }

}
