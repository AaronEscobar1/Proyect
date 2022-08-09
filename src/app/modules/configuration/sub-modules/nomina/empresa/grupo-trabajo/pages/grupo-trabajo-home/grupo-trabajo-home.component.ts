import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { Subscription } from 'rxjs';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../interfaces/nominas.interfaces';
import { GrupoTrabajo } from '../../interfaces/grupo-trabajo.interfaces';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';

@Component({
  selector: 'app-grupo-trabajo-home',
  templateUrl: './grupo-trabajo-home.component.html'
})
export class GrupoTrabajoHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de grupos
  gruposTrabajo: GrupoTrabajo[] = [];
  
  // Emisión de evento de padre a hijo (cargar data de grupos)
  @ViewChild(TipoNominaComponent) tipoNominaComponent!: TipoNominaComponent;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable empresa
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Company) => this.empresaRow = row );
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => this.nominaRow = row );
  }

  /**
   * Cargar grupos de trabajo
   */
  refresh(): void {
    this.tipoNominaComponent.loadGrupos();
  }

  /**
   * Obtener todos los grupos de trabajo por empresa y tipo de nomina
   * @param gruposTrabajoEvent: GrupoTrabajo[] lista de grupos
   */
  getDataGrupo(gruposTrabajoEvent: GrupoTrabajo[]): void {
    this.gruposTrabajo = gruposTrabajoEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
