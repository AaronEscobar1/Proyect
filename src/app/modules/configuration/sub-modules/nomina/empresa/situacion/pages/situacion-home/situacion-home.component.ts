import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../empresas/interfaces/compania.interfaces';
import { TipoNomina } from '../../../grupo-trabajo/interfaces/nominas.interfaces';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';

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
  situaciones: any[] = [];
  
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
   * Cargar evaluaciones
   */
  refresh(): void {
    this.tipoNominaComponent.loadSituaciones();
  }

  /**
   * Obtener todos los evaluaciones por empresa y tipo de nomina
   * @param situacionesEvent: any[] lista de evaluaciones
   */
  getDataGrupo(situacionesEvent: any[]): void {
    this.situaciones = situacionesEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
