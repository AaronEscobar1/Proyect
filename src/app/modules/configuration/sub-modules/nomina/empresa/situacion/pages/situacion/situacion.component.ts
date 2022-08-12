import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { ClaseSituaciones, EsquemaTrabajo, EstatusVacacion, Situacion } from '../../interfaces/situacion.interfaces';
import { SituacionService } from '../../services/situacion.service';
import { GrupoRotacion } from '../../../shared-empresa/interfaces/grupo-rotacion.interfaces';

@Component({
  selector: 'app-situacion',
  templateUrl: './situacion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class SituacionComponent implements OnInit {

  // Empresa seleccionada desde la tabla 
  @Input() empresaRow!: Company;

  // Nomina seleccionada desde la tabla
  @Input() nominaRow!: TipoNomina;

  // Objeto de situaciones por empresa y nomina
  @Input() situaciones: Situacion[] = [];

  // Objeto Grupos rotación para mostrar en el formulario
  @Input() rotacionGrupos: GrupoRotacion[] = [];

  // Objeto seleccionado para editar
  situacionSelect!: Situacion | undefined;

  // Objeto de estatus vacaciones
  estatusVacaciones: EstatusVacacion[] = [];
  // Objeto de estatus vacaciones para filtrar en tabla
  estatusVacacionesFilter: dropdownType[] = [];

  // Objeto de esquemas de trabajo
  esquemasTrabajo: EsquemaTrabajo[] = [];
  // Objeto de esquemas de trabajo para filtrar en tabla
  esquemasTrabajoFilter: dropdownType[] = [];

  // Objeto de clases situaciones
  claseSituaciones: ClaseSituaciones[] = [];
  // Objeto de clases situaciones para filtrar en tabla
  claseSituacionesFilter: dropdownType[] = [];

  // Emisión de evento (cargar data de situaciones)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar situación';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private companyNominaService: CompanyNominaService,
              private situacionService: SituacionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadEstatusVacaciones();
    this.loadEsquemaTrabajo();
    this.loadClasesSituaciones();
  }
  
  /**
   * Cargar estatus de vacaciones para el listado del formulario
   */
  loadEstatusVacaciones(): void {
    this.spinner.show();
    this.situacionService.getEstatusVacaciones()
      .subscribe({
        next: (res) => {
          this.estatusVacaciones = res;
          // Transformar el array de objetos para poder filtar en la datable
          this.estatusVacacionesFilter = this.estatusVacaciones.map(dato => { return { label: dato.descripcion, value: dato.vacsta } });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Cargar esquema de trabajo para el listado del formulario
   */
  loadEsquemaTrabajo(): void {
    this.spinner.show();
    this.situacionService.getEsquemaTrabajo()
      .subscribe({
        next: (res) => {
          this.esquemasTrabajo = res;
          // Transformar el array de objetos para poder filtar en la datable
          this.esquemasTrabajoFilter = this.esquemasTrabajo.map(dato => { return { label: dato.descripcion, value: dato.conesq } });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Cargar clases situaciones para el listado del formulario
   */
  loadClasesSituaciones(): void {
    this.spinner.show();
    this.situacionService.getClasesSituaciones()
      .subscribe({
        next: (res) => {
          this.claseSituaciones = res;
          // Transformo el array de objetos para poder filtar en la datable
          this.claseSituacionesFilter = this.claseSituaciones.map(dato => { return { label: dato.descripcion, value: dato.clasta } });
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  refresh(): void {
    this.situaciones = [];
    this.onRefresh.emit();
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
    this.titleForm = 'Agregar situación';
    this.createModal = true;
  }

  closeModal() {
    this.isEdit = false;
    this.createModal = false;
    this.situacionSelect = undefined;
  }

  /**
   * Carga la data en el formulario para editar
   * @param situacion row de la tabla
   * @returns void
   */
  editRow(situacion: Situacion): void {
    this.isEdit = true;
    this.titleForm = 'Editar situación';
    this.situacionSelect = situacion;
    this.createModal = true;
  }

  /**
   * Elimina un registro
   * @param situacion row de la tabla
   * @returns void
   */
  deleteRow(situacion: Situacion): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta situación <b>${situacion.dessta}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.situacionService.delete(situacion)
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
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se puede eliminar la situación, posee dependencia de registros.', life: 3000});
                this.spinner.hide();
                return false;
              }
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la situación.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
