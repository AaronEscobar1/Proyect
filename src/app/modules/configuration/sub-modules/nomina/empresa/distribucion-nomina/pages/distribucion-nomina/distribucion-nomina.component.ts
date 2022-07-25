import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DistribucionNominaService } from '../../services/distribucion-nomina.service';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { DistribucionNomina } from '../../interfaces/distribucion-impuesto.interfaces';

@Component({
  selector: 'app-distribucion-nomina',
  templateUrl: './distribucion-nomina.component.html',
  styleUrls: ['./distribucion-nomina.component.scss'],
  providers: [ MessageService, ConfirmationService ]
})
export class DistribucionNominaComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresa!: Company | null;

  // Objetos
  companias      : Company[] = [];
  companiaSelect!: Company | undefined;

  distribucionesNomina: DistribucionNomina[] = [];

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
  }

  ngOnChanges() {
    // Realizar peticion al backend para ver si tiene registro asignado a la empresa
    if ( this.empresa && this.empresa.id ) {
      console.log('backend', this.empresa.id);
      this.loadDistribucionNomina(this.empresa.id);
    }
  }

  /**
   * Obtener datos de parametros asignado a la empresa
   * @param id: string id empresa
   */
  loadDistribucionNomina( id: string ) {
    console.log(id);
    this.spinner.show();
    this.distribucionNominaService.getAllDistribuciones(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.distribucionesNomina = res;
          // Asignar datos al formulario
          
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
        }
      });
  }

  refresh(): void {
    this.distribucionesNomina = [];
    if ( this.empresa && this.empresa.id ) {
      this.loadDistribucionNomina(this.empresa.id);
    }
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
    this.companiaSelect = undefined;
  }

  /**
     * Carga la data en el formulario para editar
     * @param company row de la tabla
     * @returns void
     */
  editRow(company: Company): void {
    this.isEdit = true;
    this.titleForm = this.isEdit ? 'Editar distribución de nómina' : 'Agregar distribución de nómina';
    this.companiaSelect = company;
    this.openModalCreate();
  }

  /**
   * Elimina un registro
   * @param distribucionNomina row de la tabla
   * @returns void
   */
  deleteRow(distribucionNomina: any): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta distribución de nómina <b>${distribucionNomina.desemp}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.companias = this.companias.filter(val => val.id !== distribucionNomina.codemp);
        this.spinner.hide();
      }
    });
  }

}
