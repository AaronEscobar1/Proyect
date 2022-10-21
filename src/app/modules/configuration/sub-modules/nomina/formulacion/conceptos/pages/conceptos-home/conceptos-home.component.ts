import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Concepto } from '../../interfaces/concepto.interfaces';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-conceptos-home',
  templateUrl: './conceptos-home.component.html'
})
export class ConceptosHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de conceptos
  conceptos: Concepto[] = [];
  
  // Emisión de evento de padre a hijo (cargar data de conceptos)
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
   * Cargar Conceptos
   */
  refresh(): void {
    this.tipoNominaComponent.loadConceptos();
  }

  /**
   * Obtener todos los conceptos por empresa y tipo de nomina
   * @param conceptosEvent: Concepto[] lista de niveles
   */
  getDataConceptos(conceptosEvent: Concepto[]): void {
    this.conceptos = conceptosEvent;
  }

  /** Destrucción del observable */
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
