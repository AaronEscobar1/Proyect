import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { TarifaImpuesto } from '../../interfaces/tarifas-impuestos.interfaces';
import { Table } from 'primeng/table'
import { Helpers } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Datos para mostrar en la tabla
  @Input() tarifasImpuestos: TarifaImpuesto[] = [];

  // Objeto de tipos tarifas de impuesto
  @Input() tiposTarifasFilter: dropdownType[] = [];
  
  // Objeto de frecuencia de impuesto
  @Input() frecuenciasImpuestoFilter: dropdownType[] = [];

  // Objeto para mostrar las columnas de la tabla
  columns: TableHead[] = [];

  // Obtener id del elemento de la tabla
  @ViewChild('dt1') dataTable!: Table;

  // Variable para manipular el input fecha mediante [(ngModel)] para filtrar
  dateFilter: Date | null = null;

  constructor(private companyNominaService: CompanyNominaService,
              private helpers: Helpers) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'remdes', header: 'Desde'            },
      { field: 'remhas', header: 'Hasta'            },
      { field: 'tipreg', header: 'Tipo impuesto'    },
      { field: 'frecue', header: 'Frecuencia'       },
      { field: 'tasim1', header: 'Nro. 1'           },
      { field: 'tasim2', header: 'Nro. 2'           },
      { field: 'valsus', header: 'Valor sustraendo' },
      // Campo para filtrar fecha mediante método filterGlobal
      { field: 'anomes', header: 'Fecha'            }
    ];    
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

  /**
   * Devolver valor descripción
   * @param value string
   * @param objFilter: dropdownType[]
   * @returns string
   */
  getDescripcion(value: string, objFiltro: dropdownType[]): string {
    const descripcion = objFiltro.find(tipo => tipo.value === value);
    return descripcion ? descripcion.label : '-';
  }

  /**
   * Filtrar por fecha
   * @param date: Date
   */
  applyFilterGlobal(date: Date): void {
    // Formatear fecha recibida del input
    const fechaFormateada = this.helpers.formatDate(date);
    this.dataTable.filterGlobal(fechaFormateada, 'contains');
  }

  /**
   * Limpiar filtros de busqueda
   * @param table: Table
   */
  clear(table: Table): void {
    this.dateFilter = null;
    table.clear();
  }

}
