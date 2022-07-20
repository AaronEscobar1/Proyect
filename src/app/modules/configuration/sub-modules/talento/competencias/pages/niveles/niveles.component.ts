import { Component, OnInit } from '@angular/core';
import { Niveles } from '../../interfaces/nivel.interfaces';
import { NivelService } from '../../services/nivel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Competencias } from '../../interfaces/competencias.interfaces';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class NivelesComponent implements OnInit {

  // Objetos niveles
  niveles     : Niveles[] = [];
  nivelSelect!: Niveles | undefined;

  // Objeto competencia para obtener el ID
  competenciaSelect!: Competencias | undefined;

  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar nivel';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private nivelService: NivelService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    this.nivelService.getAll()
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
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }
  
  openModalCreate(competencia: Competencias): void {
    this.isEdit = false;
    this.titleForm = 'Agregar nivel';
    this.competenciaSelect = competencia;
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.nivelSelect = undefined;
  }

  refresh(): void {
    this.niveles = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param nivel row de la tabla
   */
  editRow(nivel: Niveles) {
    this.isEdit = true;
    this.titleForm = 'Editar nivel';
    this.nivelSelect = nivel;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param competencia row de la tabla
   * @returns void
   */
  deleteRow(nivel: Niveles) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este nivel <b>${nivel.nivel}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.nivelService.delete(nivel.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.loadData();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el nivel.', life: 3000});
              return false;
            }
          });
      }
    });
    this.selectRowServices.selectRowAlterno$.emit(null);
  }

}
