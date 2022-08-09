import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { TipoNomina } from '../../../shared-empresa/interfaces/nominas.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  
  // Objeto para mostrar en la tabla
  @Input() nominas!: TipoNomina[];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'tipnom', header: 'Código'      },
      { field: 'desnom', header: 'Descripción' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
