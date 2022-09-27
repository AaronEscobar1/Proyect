import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { Table } from 'primeng/table';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-valores',
  templateUrl: './data-table-valores.component.html',
  styleUrls: ['./data-table-valores.component.scss']
})
export class DataTableValoresComponent implements OnInit {

  // Objeto para mostrar valores de grados por tabulador
  @Input() valoresGrados: any[] = [];

  // Variable para seleccionar el sueldo
  @Input() sueldoSelect!: string;

  // Table
  columns: TableHead[] = [];

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'fecefe', header: 'Fecha' },
      { field: 'pastab', header: 'Paso'  },
      { field: 'valtab', header: 'Valor' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
