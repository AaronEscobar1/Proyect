import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { Procesos } from '../../interfaces/procesos.interfaces';
import { TypesFile, typesFileData } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { ProcesosService } from '../../services/procesos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ProcesosComponent implements OnInit {

  // Formulario reactivo
  form!: FormGroup;

  // Objetos
  procesos: Procesos[] = [];
  procesoSelect: Procesos | undefined;
  typesFile  : TypesFile[] = typesFileData;

  // Banderas
  isEdit: boolean = false;

  // Cargar table
  loading : boolean = false;

  // Modales
  titleForm  : string = 'Agregar proceso';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private procesosService: ProcesosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    this.procesosService.getAll()
      .subscribe({
        next: (res) => {
          this.procesos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }
  
  refresh(): void {
    this.procesos = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar proceso' : 'Agregar proceso';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.procesoSelect = undefined;
    this.createModal = false;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  /**
   * Carga la data en el formulario para editar
   * @param proceso row de la tabla
   * @returns void
   */
   editRow(proceso: Procesos): void {
    this.isEdit = true;
    // Seteamos los valores del row seleccionado al formulario
    this.procesoSelect = proceso
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param proceso row de la tabla
   * @returns void
   */
  deleteRow(proceso: Procesos): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este proceso <b>${proceso.nompro}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.procesosService.delete(proceso.tippro)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el proceso', life: 3000});
            }
          });
      }
    });
  }

}
