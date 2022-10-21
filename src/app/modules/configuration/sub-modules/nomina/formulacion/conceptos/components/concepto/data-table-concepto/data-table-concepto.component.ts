import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { Concepto } from '../../../interfaces/concepto.interfaces';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-concepto',
  templateUrl: './data-table-concepto.component.html',
  styleUrls: ['./data-table-concepto.component.scss']
})
export class DataTableConceptoComponent implements OnInit {

  // Objeto para mostrar todos conceptos por empresa y tipo nomina
  @Input() conceptos: Concepto[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',     header: 'Código'      },
      { field: 'descto', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
