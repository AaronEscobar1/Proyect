import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../grupo-trabajo/interfaces/nominas.interfaces';
import { SituacionService } from '../../services/situacion.service';

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
  @Input() situaciones: any[] = [];

  // Objeto seleccionado para editar
  situacionSelect!: any | undefined;

  // Emisión de evento (cargar data de situaciones)
  @Output() onRefresh = new EventEmitter();

  // Banderas
  isEdit: boolean = false;

  // Modales
  titleForm  : string = 'Agregar situación';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private situacionService: SituacionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
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
  editRow(situacion: any): void {
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
  deleteRow(situacion: any): void {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta situación <b>${situacion.despun}</b>?`,
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
              this.situacionService.selectRowSituacion$.emit(null);
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
