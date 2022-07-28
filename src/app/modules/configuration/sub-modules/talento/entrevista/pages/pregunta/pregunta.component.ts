import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Entrevista } from '../../interfaces/entrevista.interfaces';
import { PreguntaService } from '../../services/pregunta.service';
import { PreguntaEntrevista, TipoPregunta } from '../../interfaces/pregunta.interfaces';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class PreguntaComponent implements OnInit {

  // Fila seleccionada para filtrar las preguntas relacionadas con la entrevista
  @Input() entrevistaRow!: Entrevista; 

  // Variable para obtener todas las preguntas 
  preguntas: PreguntaEntrevista[] = [];

  // Variable para filtrar las preguntas relacionadas con las entrevistas
  preguntasEntrevistas: PreguntaEntrevista[] = [];
  
  // Variable de seleccion para editar
  preguntaSelect!: PreguntaEntrevista | undefined;

  // Variable para llenar campo tipo de pregunta en el formulario
  tiposPreguntas: TipoPregunta[] = [];

  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar pregunta';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private preguntaService: PreguntaService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    this.loadTipoPreguntas();
  }

  ngOnChanges() {
    // Realizar peticion al backend al seleccionar una entrevista
    if ( this.entrevistaRow && this.preguntas.length == 0 ) {
      this.loadPreguntas();
    } 
    // Filtrar preguntas de entrevistas sin ir al backend nuevamente
    else if ( this.preguntas.length >= 1 && this.entrevistaRow && (this.entrevistaRow.id || this.entrevistaRow.id == 0) ) {
      this.preguntasEntrevistas = this.filterPreguntas(this.entrevistaRow.id);
    } 
  }

  /**
   * Cargar data tipos de preguntas para mostrar en el formulario
   */
  loadTipoPreguntas(): void {
    this.spinner.show();
    this.preguntaService.getAllTiposPreguntas()
      .subscribe({
        next: res => {
          this.tiposPreguntas = res;
          this.spinner.hide();
        },
        error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
          }
      });
  }

  /**
   * Obtener preguntas relacionadas con una entrevista
   */
  loadPreguntas() {
    if ( !this.entrevistaRow ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No hay una entrevista seleccionada.', life: 3000});
      return;
    }
    this.spinner.show();
    this.preguntaService.getAll()
      .subscribe({
        next: (res: PreguntaEntrevista[]) => {
          this.preguntas = res;
          this.preguntasEntrevistas = this.filterPreguntas(this.entrevistaRow.id);
          this.spinner.hide();
        },
        error: (err) => {
            this.spinner.hide();
            this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
          }
      });
  }

  /**
   * Filtra las preguntas relacionadas con la entrevista
   * @param id: number, id de la entrevista
   * @param preguntas: PreguntaEntrevista[], lista de las preguntas a filtrar
   * @returns PreguntaEntrevista[]
   */
  filterPreguntas( id: number ): PreguntaEntrevista[] {
    return this.preguntas.filter(pregunta => pregunta.idEntrevista === id);
  }

  openModalCreate(): void {
    this.isEdit = false;
    this.titleForm = 'Agregar pregunta';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.preguntaSelect = undefined;
    this.createModal = false;
  }

  refresh(): void {
    this.preguntasEntrevistas = [];
    this.loadPreguntas();
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param preguntaEntrevista row de la tabla
   */
  editRow(preguntaEntrevista: PreguntaEntrevista) {
    this.isEdit = true;
    this.titleForm = 'Editar pregunta';
    this.preguntaSelect = preguntaEntrevista;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param preguntaEntrevista row de la tabla
   * @returns void
   */
  deleteRow(preguntaEntrevista: PreguntaEntrevista) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar esta pregunta <b>${preguntaEntrevista.titulo}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.preguntaService.delete(preguntaEntrevista.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowServices.selectRowAlterno$.emit(null);
              this.loadPreguntas();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar la pregunta.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
