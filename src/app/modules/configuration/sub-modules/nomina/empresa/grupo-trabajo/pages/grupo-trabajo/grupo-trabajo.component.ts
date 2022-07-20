import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoTrabajoData } from '../../interfaces/grupo-trabajo-data';
import { GrupoTrabajo } from '../../interfaces/grupo-trabajo.interfaces';
import { GrupoTrabajoService } from '../../services/grupo-trabajo.service';

@Component({
  selector: 'app-grupo-trabajo',
  templateUrl: './grupo-trabajo.component.html',
  styleUrls: ['./grupo-trabajo.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class GrupoTrabajoComponent implements OnInit {

  // Objetos
  gruposTrabajo      : GrupoTrabajo[] = [];
  grupoTrabajoSelect!: GrupoTrabajo | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar grupo de trabajo';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private grupoTrabajoService: GrupoTrabajoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.gruposTrabajo = GrupoTrabajoData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.gruposTrabajo = [];
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  openModalPrint(): void {
    this.printModal = true;
  }

  closeModalPrintDialog(): void {
    this.printModal = false;
  }

  openModalCreate(): void {
    this.titleForm = this.isEdit ? 'Editar grupo de trabajo' : 'Agregar grupo de trabajo';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.grupoTrabajoSelect = undefined;
  }

  /**
     * Carga la data en el formulario para editar
     * @param grupoTrabajo row de la tabla
     * @returns void
     */
  editRow(grupoTrabajo: GrupoTrabajo): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar grupo de trabajo' : 'Agregar grupo de trabajo';
    this.grupoTrabajoSelect = grupoTrabajo;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param grupoTrabajo row de la tabla
   * @returns void
   */
  deleteRow(grupoTrabajo: GrupoTrabajo): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este grupo de trabajo <b>${grupoTrabajo.desemp}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.gruposTrabajo = this.gruposTrabajo.filter(val => val.codemp !== grupoTrabajo.codemp);
        this.spinner.hide();
      }
    });
  }

}
