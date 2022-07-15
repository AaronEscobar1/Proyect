import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Company } from '../../../../nomina/empresa/empresas/interfaces/compania.interfaces';
import { InformacionAdicional, TipoInformacionAdicional } from '../../interfaces/informacion-adicional.interfaces';
import { InformacionAdicionalService } from '../../services/informacion-adicional.service';

@Component({
  selector: 'app-informacion-adicional',
  templateUrl: './informacion-adicional.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class InformacionAdicionalComponent implements OnInit {

  // Objetos
  informacionesAdicionales     : InformacionAdicional[]     = [];
  informacionAdicionalSelect!  : InformacionAdicional | undefined;
  empresas                     : Company[]                  = [];
  tiposInformacionesAdicionales: TipoInformacionAdicional[] = [];
  
  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar información adicional';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private informacionAdicionalService: InformacionAdicionalService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadEmpresas();
    this.loadTiposInformacionesAdicionales();
  }

  loadData() {
    this.spinner.show();
    this.informacionAdicionalService.getAll()
      .subscribe({
        next: (res) => {
          this.informacionesAdicionales = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  loadEmpresas() {
    this.spinner.show();
    this.informacionAdicionalService.getAllEmpresas()
      .subscribe({
        next: (res) => {
          this.empresas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }
  
  loadTiposInformacionesAdicionales() {
    this.spinner.show();
    this.informacionAdicionalService.getAllTiposInformacionesAdicionales()
      .subscribe({
        next: (res) => {
          this.tiposInformacionesAdicionales = res;
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
    this.titleForm = 'Agregar información adicional';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.informacionAdicionalSelect = undefined;
  }

  refresh(): void {
    this.informacionesAdicionales = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param informacionAdicional row de la tabla
   */
  editRow(informacionAdicional: InformacionAdicional) {
    this.isEdit = true;
    this.titleForm = 'Editar información adicional';
    this.informacionAdicionalSelect = informacionAdicional;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param informacionAdicional row de la tabla
   * @returns void
   */
  deleteRow(informacionAdicional: InformacionAdicional) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta información adicional <b>${informacionAdicional.nombre}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.informacionAdicionalService.delete(informacionAdicional.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la información adicional.', life: 3000});
              return false;
            }
          });
      }
    });
    this.selectRowServices.selectRow$.emit(null);
  }

}
