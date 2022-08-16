import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { Situacion } from '../../interfaces/situacion.interfaces';
import { GrupoRotacion } from '../../../shared-empresa/interfaces/grupo-rotacion.interfaces';

@Component({
  selector: 'app-situacion-home',
  templateUrl: './situacion-home.component.html'
})
export class SituacionHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de situacion
  situaciones: Situacion[] = [];
  
  // Objeto Grupos rotación para mostrar en el formulario
  rotacionGrupos: GrupoRotacion[] = [];

  // Emisión de evento de padre a hijo (cargar data de situacion)
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
   * Cargar situaciones
   */
  refresh(): void {
    this.tipoNominaComponent.loadSituaciones(true);
  }

  /**
   * Obtener todas las situaciones por empresa y tipo de nomina
   * @param situacionesEvent: Situacion[] lista de situaciones
   */
  getDataSituacion(situacionesEvent: Situacion[]): void {
    this.situaciones = situacionesEvent;
  }

  /**
   * Obtener todas las situaciones por empresa y tipo de nomina
   * @param gruposRotacionesEvent: Situacion[] lista de situaciones
   */
   getDataRotacionGrupo(gruposRotacionesEvent: GrupoRotacion[]): void {
    this.rotacionGrupos = gruposRotacionesEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
