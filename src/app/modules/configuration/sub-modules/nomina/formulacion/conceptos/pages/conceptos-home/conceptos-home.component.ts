import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../../../empresa/shared-empresa/interfaces/empresa.interfaces';
import { TipoNomina } from '../../../../empresa/shared-empresa/interfaces/nominas.interfaces';
import { Concepto } from '../../interfaces/concepto.interfaces';
import { TipoNominaComponent } from '../tipo-nomina/tipo-nomina.component';
import { Subscription } from 'rxjs';
import { SelectRowService } from 'src/app/shared/services/select-row/select-row.service';
import { TablasTipoConceptoService } from '../../services/tablas-tipo-concepto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Promedio, TipoSalario } from '../../interfaces/tablas-tipos-concepto.interfaces';

@Component({
  selector: 'app-conceptos-home',
  templateUrl: './conceptos-home.component.html',
  providers: [ MessageService, ConfirmationService ]
})
export class ConceptosHomeComponent implements OnInit {

  // Variable para seleccionar la empresa
  empresaRow!: Company;
  
  // Variable para seleccionar el tipo nomina
  nominaRow!: TipoNomina;

  // Objeto para mostrar en la tabla de conceptos
  conceptos: Concepto[] = [];
  
  // Objeto de conceptos que manejan saldos
  conceptosFilters: Concepto[] = [];

  // Objeto de tipos de salarios
  tiposSalarios: TipoSalario[] = [];

  // Objeto de promedios
  promedios: Promedio[] = [];

  // Emisión de evento de padre a hijo (cargar data de conceptos)
  @ViewChild(TipoNominaComponent) tipoNominaComponent!: TipoNominaComponent;

  // Variable para manejar la suscripción
  subscriber!: Subscription;

  constructor(private tablasTipoConceptoService: TablasTipoConceptoService,
              private messageService: MessageService,
              private selectRowServices: SelectRowService) { }

  ngOnInit(): void {
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable empresa
    this.subscriber = this.selectRowServices.selectRow$.subscribe( (row: Company) => {
      this.empresaRow = row 
      this.loadTiposSalarios(this.empresaRow);
    });
    // Se suscribe a los cambios que ocurran al cambiar de row en el datatable tipo nomina
    this.subscriber = this.selectRowServices.selectRowAlterno$.subscribe( (row: TipoNomina) => this.nominaRow = row );
  }

  /**
   * Cargar tipos de salarios por empresa
   * @param idEmpresa: string
   */
  loadTiposSalarios(empresa: Company): void {
    if ( !empresa ) return;
    this.tablasTipoConceptoService.getAllTiposSalariosByEmpresa(empresa.id)
      .subscribe({
        next: (res) => {
          this.tiposSalarios = res;
        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: 'Error', detail: 'No se pudo obtener los tipos de salarios, error conexión con el servidor.', life: 3000});
        }
      });
  }

  /**
   * Cargar Conceptos
   */
  refresh(): void {
    this.tipoNominaComponent.loadConceptos(true);
  }

  /**
   * Obtener todos los conceptos por empresa y tipo de nomina
   * @param conceptosEvent: Concepto[] lista de conceptos
   */
  getDataConceptos(conceptosEvent: Concepto[]): void {
    this.conceptos = conceptosEvent;
    // Filtrar los conceptos que solo manejen saldos
    this.conceptosFilters = this.conceptos.filter(concepto => concepto.mansal != '0');
  }

  /**
   * Obtener todos los promedios por empresa y tipo de nomina
   * @param promediosEvent: Promedio[] lista de promedios
   */
  getDataPromedios(promediosEvent: Promedio[]): void {
    this.promedios = promediosEvent;
  }

  /** Destrucción del observable */
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
