import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Parentesco } from '../../interfaces/parentesco.interfaces';
import { ParentescoService } from '../../services/parentesco.service';

@Component({
  selector: 'app-parentesco',
  templateUrl: './parentesco.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ParentescoComponent implements OnInit {

  // Objetos
  parentescos      : Parentesco[] = [];
  parentescoSelect!: Parentesco | undefined;
  
  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar parentesco';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private parentescoService: ParentescoService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.parentescoService.getAll()
      .subscribe({
        next: (res) => {
          this.parentescos = res;
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
    this.titleForm = 'Agregar parentesco';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.parentescoSelect = undefined;
  }

  refresh(): void {
    this.parentescos = [];
    this.loadData();
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param parentesco row de la tabla
   */
  editRow(parentesco: Parentesco) {
    this.isEdit = true;
    this.titleForm = 'Editar parentesco';
    this.parentescoSelect = parentesco;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param parentesco row de la tabla
   * @returns void
   */
  deleteRow(parentesco: Parentesco) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el parentesco <b>${parentesco.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.parentescoService.delete(parentesco.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowServices.selectRow$.emit(null);
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el parentesco.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
