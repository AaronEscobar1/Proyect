import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { empresasData } from '../../interfaces/localidades-data';
import { Localidades } from '../../interfaces/localidades.interfaces';
import { LocalidadesService } from '../../services/localidades.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class LocalidadesComponent implements OnInit {

  // Objetos
  localidades     : Localidades[] = [];
  localidadSelect!: Localidades | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar localidad';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private localidadesService: LocalidadesService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.localidades = empresasData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.localidades = [];
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
    this.titleForm = this.isEdit ? 'Editar localidades' : 'Agregar localidades';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.localidadSelect = undefined;
  }

  /**
     * Carga la data en el formulario para editar
     * @param localidad row de la tabla
     * @returns void
     */
  editRow(localidad: Localidades): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar localidades' : 'Agregar localidades';
    this.localidadSelect = localidad;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param localidad row de la tabla
   * @returns void
   */
  deleteRow(localidad: Localidades): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la localidad <b>${localidad.desloc}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.localidades = this.localidades.filter(val => val.codloc !== localidad.codloc);
        this.spinner.hide();
      }
    });
  }
  

}
