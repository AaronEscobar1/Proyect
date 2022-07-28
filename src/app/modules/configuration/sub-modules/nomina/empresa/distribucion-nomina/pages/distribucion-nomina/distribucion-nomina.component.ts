import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DistribucionNominaService } from '../../services/distribucion-nomina.service';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { DistribucionNomina } from '../../interfaces/distribucion-impuesto.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-distribucion-nomina',
  templateUrl: './distribucion-nomina.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class DistribucionNominaComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresa!: Company;

  // Objeto de distribuciones de nominas por empresa
  distribucionesNomina: DistribucionNomina[] = [];

  // Objeto seleccionado para editar
  distribucionNominaSelect!: DistribucionNomina | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar distribución de nómina';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private distribucionNominaService: DistribucionNominaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private selectRowService: SelectRowService ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresa && this.empresa.id ) {
      // Limpia el row de la tabla de distribucion nomina
      this.selectRowService.selectRowAlterno$.emit(null);
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadDistribucionNomina(this.empresa.id);
    }
  }

  /**
   * Obtener datos de parametros asignado a la empresa
   * @param id: string id empresa
   */
  loadDistribucionNomina( id: string ) {
    this.spinner.show();
    this.distribucionNominaService.getAllDistribuciones(id)
      .subscribe({
        next: (res) => {
          this.distribucionesNomina = res;          
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

  /**
   * Abre modal para crear
   * @returns void
   */
  openModalCreate(): void {
    this.titleForm = 'Agregar distribución de nómina';
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
  editRow(distribucionNomina: DistribucionNomina): void {
    this.isEdit = true;
    this.titleForm = 'Editar distribución de nómina';
    this.distribucionNominaSelect = distribucionNomina;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param distribucionNomina row de la tabla
   * @returns void
   */
  deleteRow(distribucionNomina: DistribucionNomina): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta distribución de nómina <b>${distribucionNomina.dessuc}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.distribucionNominaService.delete(distribucionNomina)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowService.selectRowAlterno$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la distribución nómina, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la distribución nómina.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
