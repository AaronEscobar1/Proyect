import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { MonedaNomina } from '../../interfaces/moneda-nomina.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Objeto para mostrar todos las monedas nominas por empresa y tipo nomina
  @Input() monedasNominas: MonedaNomina[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'fvigencia',    header: 'Vigencia'       },
      { field: 'monedaid',     header: 'Tipo de moneda' },
      { field: 'tipo.nombre',  header: 'por nombre'     },
      { field: 'comentario',   header: 'Comentario'     }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
