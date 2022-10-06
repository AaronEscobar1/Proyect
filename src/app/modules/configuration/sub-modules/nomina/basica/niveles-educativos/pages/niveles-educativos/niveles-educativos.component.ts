import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-niveles-educativos',
  templateUrl: './niveles-educativos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class NivelesEducativosComponent implements OnInit {

  // Objeto de niveles educativos
  niveles: NivelesEducativos[] = [];

  // Objeto seleccionado para editar
  nivel! : NivelesEducativos | undefined;
  
  // Banderas
  isEdit : boolean = false;
  
  // Modales
  titleForm      : string = 'Agregar nivel educativo';
  addNivelModal  : boolean = false;
  printNivelModal: boolean = false;
  
  constructor(private nivelesServices: NivelesEducativosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Cargar data de niveles educativos
   */
  loadData() {
    this.spinner.show();
    this.nivelesServices.getNivelesAll()
      .subscribe({
        next: (res) => {
          this.niveles = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  openModalPrint(): void {
    this.printNivelModal = true;
  }

  closeModalPrintDialog(): void {
    this.printNivelModal = false;
  }
  
  openModalCreate(): void {
    this.isEdit = false;
    this.titleForm = 'Agregar nivel educativo';
    this.addNivelModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.addNivelModal = false;
    this.nivel = undefined;
  }

  refresh(): void {
    this.niveles = [];
    this.loadData();
  }

  editRow(nivel: NivelesEducativos) {
    this.isEdit = true;
    this.titleForm = 'Editar nivel educativo';
    this.nivel = nivel;
    this.addNivelModal = true;
  }
  
  /**
   * Elimina un registro
   * @param nivel row de la tabla
   * @returns void
   */
   deleteRow(nivel: NivelesEducativos) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este nivel <b>${nivel.desniv}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.nivelesServices.deleteNivel(nivel.codniv)
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
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el nivel educativo.', life: 3000});
              return false
            }
          });
      }
    });
  }

}
