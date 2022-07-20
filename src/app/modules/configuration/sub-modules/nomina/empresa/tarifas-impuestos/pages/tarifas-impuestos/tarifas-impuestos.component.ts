import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TarifasImpuestosService } from '../../services/tarifas-impuestos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TarifaImpuesto } from '../../interfaces/tarifas-impuestos.interfaces';
import { TarifasImpuestosData } from '../../interfaces/tarifas-impuestos-data';

@Component({
  selector: 'app-tarifas-impuestos',
  templateUrl: './tarifas-impuestos.component.html',
  styleUrls: ['./tarifas-impuestos.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class TarifasImpuestosComponent implements OnInit {

  // Objetos
  tarifasImpuestos     : TarifaImpuesto[] = [];
  tarifaImpuestoSelect!: TarifaImpuesto | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar tarifa de impuesto';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private tarifasImpuestosService: TarifasImpuestosService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    setTimeout(() => {
      this.tarifasImpuestos = TarifasImpuestosData;
      this.spinner.hide();
    }, 500);
  }

  refresh(): void {
    this.tarifasImpuestos = [];
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
    this.titleForm = this.isEdit ? 'Editar tarifa de impuesto' : 'Agregar tarifa de impuesto';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.tarifaImpuestoSelect = undefined;
  }

  /**
     * Carga la data en el formulario para editar
     * @param tarifaImpuesto row de la tabla
     * @returns void
     */
  editRow(tarifaImpuesto: TarifaImpuesto): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar tarifa de impuesto' : 'Agregar tarifa de impuesto';
    this.tarifaImpuestoSelect = tarifaImpuesto;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param tarifaImpuesto row de la tabla
   * @returns void
   */
  deleteRow(tarifaImpuesto: TarifaImpuesto): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta tarifa de impuesto <b>${tarifaImpuesto.destar}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.tarifasImpuestos = this.tarifasImpuestos.filter(val => val.codtar !== tarifaImpuesto.codtar);
        this.spinner.hide();
      }
    });
  }

}
