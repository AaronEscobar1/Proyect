import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { EstadoCivil } from '../../interfaces/estado-civil.interfaces';
import { EstadoCivilService } from '../../services/estado-civil.service';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class EstadoCivilComponent implements OnInit {

  // Objetos
  estadosCiviles    : EstadoCivil[] = [];
  estadoCivilSelect!: EstadoCivil | undefined;
  
  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar estado civil';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private estadoCivilService: EstadoCivilService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.estadoCivilService.getAll()
      .subscribe({
        next: (res) => {
          this.estadosCiviles = res;
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
    this.titleForm = 'Agregar estado civil';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.estadoCivilSelect = undefined;
  }

  refresh(): void {
    this.estadosCiviles = [];
    this.loadData();
  }

  editRow(estadoCivil: EstadoCivil) {
    this.isEdit = true;
    this.titleForm = 'Editar estado civil';
    this.estadoCivilSelect = estadoCivil;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param estadoCivil row de la tabla
   * @returns void
   */
  deleteRow(estadoCivil: EstadoCivil) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el estado civil <b>${estadoCivil.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.estadoCivilService.delete(estadoCivil.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el estado civil.', life: 3000});
              return false
            }
          });
      }
    });
    this.selectRowServices.selectRow$.emit(null);
  }

}
