import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { ClaseInformacionService } from '../../services/clase-informacion.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerLight } from 'src/app/shared/components/spinner/spinner.interfaces';
import { ClaseInformacion, Equivalencia } from '../../interfaces/clase-informacion.interfaces';

@Component({
  selector: 'app-clase-informacion',
  templateUrl: './clase-informacion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ClaseInformacionComponent implements OnInit {

  // Objeto para obtener el id de la empresa
  @Input() empresaRow!: Company;

  // Objeto de clases de informaciones por empresa
  clasesInformacion: ClaseInformacion[] = [];

  // Objeto seleccionado para editar
  claseInformacionSelect!: ClaseInformacion | undefined;

  // Objeto de equivalencias
  equivalencias: Equivalencia[] = [];

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar clase de información';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private claseInformacionService: ClaseInformacionService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadEquivalencias();
  }

  ngOnChanges() {
    // Validar si empresa existe y tiene id
    if ( this.empresaRow && this.empresaRow.id ) {
      // Realizar peticion al backend asociada a la empresa seleccionada
      this.loadClasesInformacion(this.empresaRow.id);
    }
  }

  /**
   * Carga todas las equivalencias
   */
   loadEquivalencias(): void {
    this.spinner.show();
    this.claseInformacionService.getEquivalencias()
      .subscribe({
        next: (resp) => {
          this.equivalencias = resp;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener datos de clases de informacion asignada a la empresa
   * @param idEmpresa: string id empresa
   */
  loadClasesInformacion( idEmpresa: string ): void {
    this.spinner.show(undefined, spinnerLight);
    this.claseInformacionService.getClasesInformacionByEmpresa(idEmpresa)
      .subscribe({
        next: (res) => {
          this.clasesInformacion = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.clasesInformacion = [];
    if ( this.empresaRow && this.empresaRow.id ) {
      this.loadClasesInformacion(this.empresaRow.id);
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
    this.titleForm = 'Agregar clase de información';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.createModal = false;
    this.claseInformacionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param claseInformacion row de la tabla
   * @returns void
   */
  editRow(claseInformacion: ClaseInformacion): void {
    this.isEdit = true;
    this.titleForm = 'Editar clase de información';
    this.claseInformacionSelect = claseInformacion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param claseInformacion row de la tabla
   * @returns void
   */
  deleteRow(claseInformacion: ClaseInformacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta clase de Informacion <b>${claseInformacion.nombre}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.claseInformacionService.delete(claseInformacion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la clase de Informacion, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la clase de Informacion.', life: 3000});
              return false;
            }
          });
      }
    });
  }


}
