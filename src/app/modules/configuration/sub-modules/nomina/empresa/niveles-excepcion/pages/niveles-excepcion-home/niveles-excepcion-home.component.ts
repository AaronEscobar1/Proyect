import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { NivelExcepcion } from '../../interfaces/niveles-excepcion.interfaces';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';

@Component({
  selector: 'app-niveles-excepcion-home',
  templateUrl: './niveles-excepcion-home.component.html'
})
export class NivelesExcepcionHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de niveles de excepción
  nivelesExcepcion: NivelExcepcion[] = [];
  
  // Emisión de evento de padre a hijo (cargar data de niveles de excepción)
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
   * Cargar niveles de excepción
   */
  refresh(): void {
    this.tipoNominaComponent.loadNivelesExcepcion();
  }

  /**
   * Obtener todos los niveles de excepción por empresa y tipo de nomina
   * @param nivelExcepcionEvent: NivelExcepcion[] lista de niveles
   */
  getDataGrupo(nivelExcepcionEvent: NivelExcepcion[]): void {
    this.nivelesExcepcion = nivelExcepcionEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
