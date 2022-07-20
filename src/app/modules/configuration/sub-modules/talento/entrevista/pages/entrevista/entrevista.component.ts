import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Entrevista } from '../../interfaces/entrevista.interfaces';
import { EntrevistaService } from '../../services/entrevista.service';

@Component({
  selector: 'app-entrevista',
  templateUrl: './entrevista.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EntrevistaComponent implements OnInit {

  // Objetos
  entrevistas      : Entrevista[] = [];
  entrevistaSelect!: Entrevista | undefined;
  
  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar entrevista';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private entrevistaService: EntrevistaService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.entrevistaService.getAll()
      .subscribe({
        next: (res) => {
          this.entrevistas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }
  
  openModalCreate(): void {
    this.isEdit = false;
    this.titleForm = 'Agregar entrevista';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.entrevistaSelect = undefined;
  }

  refresh(): void {
    this.entrevistas = [];
    this.loadData();
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param entrevista row de la tabla
   */
  editRow(entrevista: Entrevista) {
    this.isEdit = true;
    this.titleForm = 'Editar entrevista';
    this.entrevistaSelect = entrevista;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param entrevista row de la tabla
   * @returns void
   */
  deleteRow(entrevista: Entrevista) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta entrevista <b>${entrevista.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.entrevistaService.delete(entrevista.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la entrevista.', life: 3000});
              return false;
            }
          });
      }
    });
    this.selectRowServices.selectRow$.emit(null);
  }

}
