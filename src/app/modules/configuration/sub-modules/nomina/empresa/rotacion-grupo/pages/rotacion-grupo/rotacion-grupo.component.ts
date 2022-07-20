import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RotacionGrupo } from '../../interfaces/rotacion-grupo.interfaces';
import { RotacionGrupoService } from '../../services/rotacion-grupo.service';
import { RotacionGrupoData } from '../../interfaces/rotacion-grupo-data';

@Component({
  selector: 'app-rotacion-grupo',
  templateUrl: './rotacion-grupo.component.html',
  styleUrls: ['./rotacion-grupo.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class RotacionGrupoComponent implements OnInit {

  // Objetos
  rotacionGrupos      : RotacionGrupo[] = [];
  rotacionGrupoSelect!: RotacionGrupo | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar rotación grupo';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private rotacionGrupoService: RotacionGrupoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.rotacionGrupos = RotacionGrupoData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.rotacionGrupos = [];
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
    this.titleForm = this.isEdit ? 'Editar rotación de grupo' : 'Agregar rotación de grupo';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.rotacionGrupoSelect = undefined;
  }

  /**
     * Carga la data en el formulario para editar
     * @param rotacionGrupo row de la tabla
     * @returns void
     */
  editRow(rotacionGrupo: RotacionGrupo): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar rotación de grupo' : 'Agregar rotación de grupo';
    this.rotacionGrupoSelect = rotacionGrupo;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param rotacionGrupo row de la tabla
   * @returns void
   */
  deleteRow(rotacionGrupo: RotacionGrupo): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta rotación de grupo <b>${rotacionGrupo.desemp}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.rotacionGrupos = this.rotacionGrupos.filter(val => val.codemp !== rotacionGrupo.codemp);
        this.spinner.hide();
      }
    });
  }

}
