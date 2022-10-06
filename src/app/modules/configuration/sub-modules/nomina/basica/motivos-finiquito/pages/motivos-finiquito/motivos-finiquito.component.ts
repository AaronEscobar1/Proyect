import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClasificacionMotivo, MotivosFiniquito } from '../../interfaces/motivos-finiquito.interfaces';
import { MotivosFiniquitoService } from '../../services/motivos-finiquito.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-motivos-finiquito',
  templateUrl: './motivos-finiquito.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class MotivosFiniquitoComponent implements OnInit {

  // Objetos de motivos de finiquitos
  motivosFiniquito: MotivosFiniquito[] = [];

  // Objeto seleccionado para editar
  motivoFiniquito!: MotivosFiniquito | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar motivo de finiquito';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private motivosFiniquitoService: MotivosFiniquitoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Cargar motivos de finiquitos
   */
  loadData(): void {
    this.spinner.show();
    this.motivosFiniquitoService.getAll()
      .subscribe({
        next: (res) => {
          this.motivosFiniquito = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.motivosFiniquito = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar motivo de finiquito' : 'Agregar motivo de finiquito';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.motivoFiniquito = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param motivosFiniquito row de la tabla
   * @returns void
   */
  editRow(motivosFiniquito: MotivosFiniquito): void {
    this.isEdit = true;
    this.titleForm = 'Editar motivos de finiquito';
    this.motivoFiniquito = motivosFiniquito
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param motivosFiniquito row de la tabla
   * @returns void
   */
    deleteRow(motivosFiniquito: MotivosFiniquito): void {
      this.confirmationService.confirm({
        message: `¿Desea eliminar este motivo de finiquito <b>${motivosFiniquito.desde1}</b>?`,
        header: 'Eliminar',
        icon: 'pi pi-trash',
        acceptLabel: 'Si, eliminar',
        acceptButtonStyleClass: 'btn-infocent',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          this.spinner.show();
          this.motivosFiniquitoService.delete(motivosFiniquito.coddes)
            .subscribe({
              next: (resp) => {
                this.spinner.hide();
                this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
                this.selectRowService.selectRow$.emit(null);
                this.loadData();
              },
              error: (err) => {
                this.spinner.hide();
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el motivo finiquito', life: 3000});
              }
            });
        }
      });
    }

}
