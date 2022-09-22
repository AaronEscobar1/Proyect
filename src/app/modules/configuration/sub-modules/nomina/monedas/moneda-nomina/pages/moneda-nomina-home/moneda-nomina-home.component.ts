import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { MonedaNomina } from '../../interfaces/moneda-nomina.interfaces';

@Component({
  selector: 'app-moneda-nomina-home',
  templateUrl: './moneda-nomina-home.component.html'
})
export class MonedaNominaHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de monedas nominas
  monedasNominas: MonedaNomina[] = [];
  
  // Emisión de evento de padre a hijo (cargar data de monedas nominas)
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
   * Cargar monedas nominas
   */
  refresh(): void {
    this.tipoNominaComponent.loadMonedasNominas();
  }

  /**
   * Obtener monedas nominas por empresa y tipo de nomina
   * @param monedasNominasEvent: MonedaNomina[] monedas nominas
   */
  getDataGrupo(monedasNominasEvent: MonedaNomina[]): void {
    this.monedasNominas = monedasNominasEvent;
  }

  /** Destrucción del observable*/
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
