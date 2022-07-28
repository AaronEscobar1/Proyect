import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { GrupoTrabajoService } from '../../services/grupo-trabajo.service';
import { TipoNomina } from '../../interfaces/nominas.interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Subscription } from 'rxjs';
import { GrupoTrabajo } from '../../interfaces/grupo-trabajo.interfaces';

@Component({
  selector: 'app-tipo-nomina',
  templateUrl: './tipo-nomina.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class TipoNominaComponent implements OnInit {

  // Fila seleccionada para filtrar los grupos de empresa con tipo nomina
  @Input() empresaRow!: Company;

  // Fila seleccionada de tipos de nominas
  tipoNominaRow!: TipoNomina | null;

  // Variable para obtener los tipos de nomina por empresa
  tiposNominas: TipoNomina[] = [];

  // Emisión de evento (cargar data de grupos)
  @Output() onGetDataGrupo = new EventEmitter();

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private grupoTrabajoService: GrupoTrabajoService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => {
      this.tipoNominaRow = row;
      this.loadGrupos();
    });
  }

  ngOnChanges(): void {
    // Realizar peticion al backend al seleccionar una empresa
    if ( this.empresaRow && this.empresaRow.id) {
      this.loadNominas(this.empresaRow.id);
    } 
    // Vaciar los tipos de nomninas cuando la empresa se deselecciona
    else if ( this.empresaRow == null ) {
      this.tiposNominas = []; 
    }
  }

  loadNominas(id: string): void {
    this.spinner.show();
    this.grupoTrabajoService.getAllNominasByEmpresa(id)
      .subscribe({
        next: (res: TipoNomina[]) => {
          this.tiposNominas = res;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Obtener los grupos relacionadas con una empresa y un tipo de nomina
   */
  loadGrupos(): void {
    if ( !this.tipoNominaRow ) {
      return;
    }
    this.spinner.show();
    this.grupoTrabajoService.getAllGruposByEmpresaNomina(this.empresaRow.id, this.tipoNominaRow.tipnom)
      .subscribe({
        next: (res: GrupoTrabajo[]) => {
          this.onGetDataGrupo.emit(res);
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
