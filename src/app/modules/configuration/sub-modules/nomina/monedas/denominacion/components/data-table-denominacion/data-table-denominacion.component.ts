import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { DenominacionMoneda } from '../../interfaces/denominacion-moneda.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table-denominacion',
  templateUrl: './data-table-denominacion.component.html',
  styleUrls: ['data-table-denominacion.component.scss']
})
export class DataTableDenominacionComponent implements OnInit {

  // Objeto para mostrar todos los niveles de excepcion por empresa y tipo nomina
  @Input() denominacionesMonedas: DenominacionMoneda[] = [];

  // Table
  columns: TableHead[] = [];

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'fvigencia', header: 'Vigencia'     },
      { field: 'valor',     header: 'Valor'        },
      { field: 'nombre',    header: 'Denominación' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
