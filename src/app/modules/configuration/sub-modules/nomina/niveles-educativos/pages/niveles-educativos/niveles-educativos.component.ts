import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NivelesEducativosService } from '../../services/niveles-educativos.service';
import { NivelesEducativos } from '../../interfaces/niveles-educativos.interfaces';
import { Helpers } from '../../../../../../../shared/helpers/helpers';

@Component({
  selector: 'app-niveles-educativos',
  templateUrl: './niveles-educativos.component.html',
  providers: [MessageService, ConfirmationService]
})
export class NivelesEducativosComponent implements OnInit {

  // Objetos
  niveles: NivelesEducativos[] = [];
  nivel! : NivelesEducativos | undefined;
  
  // Banderas
  isEdit : boolean = false;
  
  // Modales
  titleForm      : string = 'Agregar niveles educativos';
  addNivelModal  : boolean = false;
  printNivelModal: boolean = false;
  
  constructor(private nivelesServices: NivelesEducativosService, 
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private helpers: Helpers) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
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

  showModalPrintDialog(): void {
    this.printNivelModal = true;
  }

  closeModalPrintDialog(): void {
    this.printNivelModal = false;
  }
  
  showModalAddDialog(): void {
    this.titleForm = this.isEdit ? 'Editar niveles educativos' : 'Agregar niveles educativos';
    this.isEdit = false;
    this.addNivelModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.addNivelModal = false;
    this.nivel = undefined;
  }

  refresh(): void {
    this.niveles = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  editSelectNivel(niveles: NivelesEducativos) {
    this.isEdit = true;
    if (!niveles) { 
      this.helpers.openErrorAlert('No se encontro el id.')
      return; 
    }
    this.titleForm = this.isEdit ? 'Editar niveles educativos' : 'Agregar niveles educativos';
    this.nivel = niveles
    this.addNivelModal = true;
  }
  
  /**
   * Elimina un registro
   * @param nivel row de la tabla
   * @returns void
   */
  deleteNivel(nivel: NivelesEducativos) {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar el nivel <b>${nivel?.desniv}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.nivelesServices.deleteNivel(nivel.codniv)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
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
    this.nivelesServices.selectRow$.emit(null);
  }

}
