import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { PuntajeEvaluacion } from '../../interfaces/puntaje-evaluacion.interfaces';

@Component({
  selector: 'app-data-table-puntaje',
  templateUrl: './data-table-puntaje.component.html',
  styleUrls: ['./data-table-puntaje.component.scss']
})
export class DataTablePuntajeComponent implements OnInit {

  // Objeto para mostrar todos los puntajes de evaluación por empresa y tipo nomina
  @Input() puntajesEvaluacion: PuntajeEvaluacion[] = [];

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  aumentoFilter: dropdownType[] = [];

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
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
