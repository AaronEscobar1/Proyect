import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoIdentificacion } from '../../interfaces/tipo-identificacion.interfaces';
import { TipoIdentificacionService } from '../../services/tipo-identificacion.service';

@Component({
  selector: 'app-tipo-identificacion',
  templateUrl: './tipo-identificacion.component.html',  
  providers: [ MessageService, ConfirmationService ]
})
export class TipoIdentificacionComponent implements OnInit {

  // Objetos
  tiposIdentificacion      : TipoIdentificacion[] = [];
  tipoIdentificacionSelect!: TipoIdentificacion | undefined;
  
  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar tipo de identificación';
  createModal: boolean = false;
  printModal : boolean = false; 

  constructor(private tipoIdentificacionService: TipoIdentificacionService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.spinner.show();
    this.tipoIdentificacionService.getAll()
      .subscribe({
        next: (res) => {
          this.tiposIdentificacion = res;
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
    this.titleForm = 'Agregar tipo de identificación';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.tipoIdentificacionSelect = undefined;
  }

  refresh(): void {
    this.tiposIdentificacion = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  editRow(tipoIdentificacion: TipoIdentificacion) {
    this.isEdit = true;
    this.titleForm = 'Editar tipo de identificación';
    this.tipoIdentificacionSelect = tipoIdentificacion;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param tipoIdentificacion row de la tabla
   * @returns void
   */
  deleteRow(tipoIdentificacion: TipoIdentificacion) {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el tipo de identificación <b>${tipoIdentificacion.descrip}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.tipoIdentificacionService.delete(tipoIdentificacion.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el tipo de identificación.', life: 3000});
              return false
            }
          });
      }
    });
    this.selectRowServices.selectRow$.emit(null);
  }

}
