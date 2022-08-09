import { Component, OnInit, Input } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';
import { TarifaImpuesto } from '../../interfaces/tarifas-impuestos.interfaces';

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

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'remdes', header: 'Desde'            },
      { field: 'remhas', header: 'Hasta'            },
      { field: 'tipreg', header: 'Tipo impuesto'    },
      { field: 'frecue', header: 'Frecuencia'       },
      { field: 'tasim1', header: 'Nro. 1'           },
      { field: 'tasim2', header: 'Nro. 2'           },
      { field: 'valsus', header: 'Valor sustraendo' },
    ];    
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

  tipoImpuestoString(value: string): string {
    const tipoTarifa = this.tiposTarifasFilter.find(tipo => tipo.value === value);
    return tipoTarifa ? tipoTarifa.label : '-';
  }

  frecuenciaImpuestoString(value: number): string {
    const frecuenciaImpuesto = this.frecuenciasImpuestoFilter.find(frec => frec.value === value);
    return frecuenciaImpuesto ? frecuenciaImpuesto.label : '-';
  }

}
