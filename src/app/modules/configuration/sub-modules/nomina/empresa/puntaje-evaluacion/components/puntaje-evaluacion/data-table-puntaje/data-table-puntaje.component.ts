import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { PuntajeEvaluacion } from '../../../interfaces/puntaje-evaluacion.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-puntaje',
  templateUrl: './data-table-puntaje.component.html',
  styleUrls: ['./data-table-puntaje.component.scss']
})
export class DataTablePuntajeComponent implements OnInit {

  // Objeto para mostrar todos los puntajes de evaluación por empresa y tipo nomina
  @Input() puntajesEvaluacion: PuntajeEvaluacion[] = [];

  // Variable para seleccionar el registro de la tabla
  puntajeEvaluacionSelectRow!: PuntajeEvaluacion | null;

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  aumentoFilter: dropdownType[] = [];

  // Emision de evento (Habilitar la pestaña aumento por evaluación)
  @Output() onEnableTabAumento = new EventEmitter();

  // Emision de evento (Enviar puntaje de evaluación seleccionado)
  @Output() onPuntajeEvaluacionSelect = new EventEmitter();

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codpun', header: 'Código'      },
      { field: 'despun', header: 'Descripción' }
    ];
    // Objeto para filtrar los dias laborables en la tabla
    this.aumentoFilter = [
      { label: 'Si',    value: '1' },
      { label: 'No',    value: '0' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
    // Llenar variable del registro seleccionado
    this.puntajeEvaluacionSelectRow = event.data;
    // Deshabilitar pestaña Aumento por evaluación
    this.onEnableTabAumento.emit(false);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
    // Vaciar variable del registro seleccionado
    this.puntajeEvaluacionSelectRow = null;
    // Deshabilitar pestaña Aumento por evaluación
    this.onEnableTabAumento.emit(false);
  }

  /**
   * Emitir evento para habilitar pestaña de aumento por evaluación
   * Emitir evento para enviar el puntaje de evaluación seleccionado
   */
  loadAumento(): void {
    // Habilitar pestaña aumento por evaluación
    this.onEnableTabAumento.emit(true);
    // Enviar puntaje de evaluacion seleccionado
    this.onPuntajeEvaluacionSelect.emit(this.puntajeEvaluacionSelectRow);
  }

}
