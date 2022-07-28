import { Component, Input, OnInit } from '@angular/core';
import { Niveles } from '../../interfaces/nivel.interfaces';
import { NivelService } from '../../services/nivel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Competencias } from '../../interfaces/competencias.interfaces';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class NivelesComponent implements OnInit {

  // Fila seleccionada para filtrar los niveles relacionadas con la competencia
  @Input() competenciaRow!: Competencias; 

  // Variable para obtener todas los niveles 
  niveles: Niveles[] = [];

  // Variable para filtrar los niveles relacionadas con las competencias
  nivelesCompetencias: Niveles[] = [];

  // Variable de seleccion para editar
  nivelSelect!: Niveles | undefined;

  // Banderas
  isEdit: boolean = false;
  
  // Modales
  titleForm  : string  = 'Agregar nivel';
  createModal: boolean = false;
  printModal : boolean = false;

  constructor(private nivelService: NivelService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // Realizar peticion al backend al seleccionar una competencia
    if ( this.competenciaRow && this.niveles.length == 0 ) {
      this.loadNiveles();
    } 
    // Filtrar niveles de compentecia sin ir al backend nuevamente
    else if ( this.niveles.length >= 1 && this.competenciaRow && (this.competenciaRow.id || this.competenciaRow.id == 0) ) {
      this.nivelesCompetencias = this.filterNiveles(this.competenciaRow.id);
    } 
  }

  /**
   * Obtener niveles relacionadas con una competencia
   */
  loadNiveles() {    
    if ( !this.competenciaRow ) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No hay una competencia seleccionada.', life: 3000});
      return;
    }
    this.spinner.show();
    this.nivelService.getAll()
      .subscribe({
        next: (res: Niveles[]) => {
          this.niveles = res;
          this.nivelesCompetencias = this.filterNiveles(this.competenciaRow.id);
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Filtra los niveles relacionadas con la competencia
   * @param id: number, id del nivel
   * @returns Niveles[]
   */
  filterNiveles( id: number ): Niveles[] {
    return this.niveles.filter(nivel => nivel.id_competencia === id);
  }
  
  openModalCreate(): void {
    this.isEdit = false;
    this.titleForm = 'Agregar nivel';
    this.createModal = true;
  }

  closeModal(): void {
    this.isEdit = false;
    this.nivelSelect = undefined;
    this.createModal = false;
  }

  refresh(): void {
    this.nivelesCompetencias = [];
    this.loadNiveles();
  }

  /**
   * Seleccionar el row para editar y abrir el modal
   * @param nivel row de la tabla
   */
  editRow(nivel: Niveles) {
    this.isEdit = true;
    this.titleForm = 'Editar nivel';
    this.nivelSelect = nivel;
    this.createModal = true;
  }
  
  /**
   * Elimina un registro
   * @param nivel row de la tabla
   * @returns void
   */
  deleteRow(nivel: Niveles) {
    this.confirmationService.confirm({
      message: `¿Desea eliminar este nivel <b>${nivel.nivel}</b>?`,
      header: 'Eliminar',
      icon: 'pi pi-trash',
      acceptLabel: 'Si, eliminar',
      acceptButtonStyleClass: 'btn-infocent',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.spinner.show();
        this.nivelService.delete(nivel.id)
          .subscribe({
            next: (resp) => {
              this.spinner.hide();
              this.messageService.add({severity:'success', summary: 'Éxito', detail: resp.message, life: 3000});
              this.selectRowServices.selectRowAlterno$.emit(null);
              this.loadNiveles();
              return true;
            },
            error: (err) => {
              this.spinner.hide();
              this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo eliminar el nivel.', life: 3000});
              return false;
            }
          });
      }
    });
  }

}
