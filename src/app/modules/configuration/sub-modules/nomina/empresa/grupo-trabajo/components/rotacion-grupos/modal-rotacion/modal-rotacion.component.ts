import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../../../../shared-empresa/interfaces/empresa.interfaces';
import { GrupoRotacion } from '../../../../shared-empresa/interfaces/grupo-rotacion.interfaces';
import { TipoNomina } from '../../../../shared-empresa/interfaces/nominas.interfaces';
import { GrupoTrabajo } from '../../../interfaces/grupo-trabajo.interfaces';
import { GrupoTrabajoService } from '../../../services/grupo-trabajo.service';

@Component({
  selector: 'app-modal-rotaciones',
  templateUrl: './modal-rotacion.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ModalRotacionComponent implements OnInit {

  // Ver modal
  @Input() dataTableRotacionesModal!: boolean;

  // Variable del registro de la tabla
  gruposTrabajoSelectRow!: GrupoTrabajo;

  nomina!: TipoNomina | undefined;
  
  // Titulo del modal
  title: string = 'Rotacion de Grupo de Trabajo';

  // Objeto de rotaciones de grupo
  rotacionesGrupoTrabajo: GrupoRotacion[] = [];

  // Emisión de eventos (cerrar)
  @Output() onCloseDataTableModal = new EventEmitter();

  constructor(private conceptoSituacionService: GrupoTrabajoService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  /**
   * Cargar concepto por grupo de trabajo
   * @param grupoTrabajo: Grupo Trabajo
   */
  loadRotacion(grupoTrabajo: GrupoTrabajo, nomina?: TipoNomina): void {    
    this.nomina = nomina
    if (!this.nomina) return
    this.gruposTrabajoSelectRow = grupoTrabajo;
    this.rotacionesGrupoTrabajo = [];
    this.spinner.show();
    this.conceptoSituacionService.getAllRotacionesByGruposEmpresaNomina(this.nomina.idEmpresa, this.nomina.tipnom, grupoTrabajo.codgru)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.rotacionesGrupoTrabajo = res;
          // Mapeo la data y agrego un atributo `idTableTemporal` para colocarlo como [dataKey] en la tabla table edit
          this.rotacionesGrupoTrabajo = this.rotacionesGrupoTrabajo.map((data, index) => { 
            return {...data, idTableTemporal: index }
          });
          console.log(this.rotacionesGrupoTrabajo);
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener conexión con el servidor.', life: 3000});
        }
      });
  }

  closeModal(): void {
    this.onCloseDataTableModal.emit();
  }

}
