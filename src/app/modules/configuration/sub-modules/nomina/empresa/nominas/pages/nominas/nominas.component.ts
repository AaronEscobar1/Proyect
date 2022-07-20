import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Nominas } from '../../interfaces/nominas.interfaces';
import { NominasService } from '../../services/nominas.service';
import { empresasData } from '../../interfaces/nominas-data';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class NominasComponent implements OnInit {

  // Objetos
  nominas      : Nominas[] = [];
  nominaSelect!: Nominas | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar nominas';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private nominasService: NominasService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.nominas = empresasData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.nominas = [];
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
    this.titleForm = this.isEdit ? 'Editar nóminas' : 'Agregar nóminas';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.nominaSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param nomina row de la tabla
   * @returns void
   */
  editRow(nomina: Nominas): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar nóminas' : 'Agregar nóminas';
    this.nominaSelect = nomina;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param nomina row de la tabla
   * @returns void
   */
  deleteRow(nomina: Nominas): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este tipo de nómina <b>${nomina.desemp}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.nominas = this.nominas.filter(val => val.codemp !== nomina.codemp);
        this.spinner.hide();
      }
    });
  }

}
