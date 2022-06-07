import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { empresasData } from '../../interfaces/distribucion-impuesto-data';
import { EmpresaNomina } from '../../interfaces/distribucion-impuesto.interfaces';
import { DistribucionNominaService } from '../../services/distribucion-nomina.service';

@Component({
  selector: 'app-distribucion-nomina',
  templateUrl: './distribucion-nomina.component.html',
  styleUrls: ['./distribucion-nomina.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DistribucionNominaComponent implements OnInit {

  // Objetos
  distribucionNominas      : EmpresaNomina[] = [];
  distribucionNominaSelect!: EmpresaNomina | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar distribución de nómina';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private distribucionNominaService: DistribucionNominaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.distribucionNominas = empresasData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.distribucionNominas = [];
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
    this.titleForm = this.isEdit ? 'Editar distribución de nómina' : 'Agregar distribución de nómina';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.distribucionNominaSelect = undefined;
  }

  /**
     * Carga la data en el formulario para editar
     * @param distribucionNomina row de la tabla
     * @returns void
     */
  editRow(distribucionNomina: EmpresaNomina): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar distribución de nómina' : 'Agregar distribución de nómina';
    this.distribucionNominaSelect = distribucionNomina;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param distribucionNomina row de la tabla
   * @returns void
   */
  deleteRow(distribucionNomina: EmpresaNomina): void {
    this.confirmationService.confirm({
      message: `¿Estas seguro que quieres borrar la distribución de nómina <b>${distribucionNomina.desemp}</b>?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        this.spinner.show();
        this.distribucionNominas = this.distribucionNominas.filter(val => val.codemp !== distribucionNomina.codemp);
        this.spinner.hide();
      }
    });
  }

}
