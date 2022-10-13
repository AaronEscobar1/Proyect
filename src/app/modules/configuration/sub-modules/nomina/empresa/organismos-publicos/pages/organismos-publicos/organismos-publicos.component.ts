import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { OrganismoPublico } from '../../interfaces/organismos-publicos.interfaces';
import { OrganismosPublicosService } from '../../services/organismos-publicos.service';

@Component({
  selector: 'app-organismos-publicos',
  templateUrl: './organismos-publicos.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class OrganismosPublicosComponent implements OnInit {

  // Objeto organismos publicos
  organismosPublicos: OrganismoPublico[] = [];

  // Objeto seleccionado para editar
  organismoPublicoSelect: OrganismoPublico | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar organismo público';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private organismosPublicosService: OrganismosPublicosService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowService: SelectRowService) { }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Cargar organismos públicos
   */
  loadData() {
    this.spinner.show();
    this.organismosPublicosService.getAll()
      .subscribe({
        next: (res) => {
          this.organismosPublicos = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.organismosPublicos = [];
    this.loadData();
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }
  
  /**
   * Abre modal para crear
   * @returns void
   */
  openModalCreate(): void {
    this.titleForm = 'Agregar organismo público';
    this.createModal = true;
  }
  
  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.organismoPublicoSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param organismoPublico row de la tabla
   * @returns void
   */
  editRow(organismoPublico: OrganismoPublico): void {
    this.isEdit = true;
    this.titleForm = 'Editar organismo público';
    this.organismoPublicoSelect = organismoPublico;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param organismoPublico row de la tabla
   * @returns void
   */
  deleteRow(organismoPublico: OrganismoPublico) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este organismo público <b>${organismoPublico.nomorg}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.organismosPublicosService.delete(organismoPublico.codorg)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRow$.emit(null);
              this.loadData();
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el organismo público, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar este organismo público.', life: 3000});
              return false;
            }
          });
      }
    });
  }


}
