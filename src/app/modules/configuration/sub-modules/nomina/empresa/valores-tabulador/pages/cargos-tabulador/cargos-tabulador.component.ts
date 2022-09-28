import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CargoTabulador } from '../../interfaces/cargos-tabulador.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { CargosTabuladorService } from '../../services/cargos-tabulador.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { Grados } from '../../interfaces/grados-tabuladores.interfaces';

@Component({
  selector: 'app-cargos-tabulador',
  templateUrl: './cargos-tabulador.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class CargosTabuladorComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de grados por tabulador
  @Input() grados: Grados[] = [];

  // Objeto cargos por tabulador
  cargosTabulador: CargoTabulador[] = [];

  // Objeto seleccionado para editar
  cargoTabuladorSelect!: CargoTabulador | undefined;

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar cargo por tabulador';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private cargosTabuladorService: CargosTabuladorService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadCargosTabulador(this.empresaRow.id);
    }
  }

  /**
   * Obtener datos de cargos por tabulador asignado a la empresa
   * @param idEmpresa: string id empresa
   */
  loadCargosTabulador( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.cargosTabuladorService.getCargosTabuladorByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.cargosTabulador = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.cargosTabulador = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadCargosTabulador(this.empresaRow.id);
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
    this.titleForm = 'Agregar cargo por tabulador';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.cargoTabuladorSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param cargo row de la tabla
   * @returns void
   */
  editRow(cargo: CargoTabulador): void {
    this.isEdit = true;
    this.titleForm = 'Editar grado por tabulador';
    this.cargoTabuladorSelect = cargo;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param cargoTabulador row de la tabla
   * @returns void
   */
  deleteRow(cargoTabulador: CargoTabulador): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este cargo por tabulador?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.cargosTabuladorService.delete(cargoTabulador)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.companyNominaService.selectRowThirdTable$.emit(null);
              this.refresh();
              return true;
            },
            error: (err) => {
              if ( err.error.message === 'Error en solicitud.' ) {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar el cargo por tabulador, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el cargo por tabulador.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
