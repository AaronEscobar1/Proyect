import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../../empresa/shared-empresa/services/company-nomina.service';
import { EquivalenciaTipoCuenta } from '../../../interfaces/equivalencias.interfaces';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table-equivalencias',
  templateUrl: './data-table-equivalencias.component.html',
  styleUrls: ['./data-table-equivalencias.component.scss']
})
export class DataTableEquivalenciasComponent implements OnInit {

  // Objeto para mostrar equivalencias de cuentas
  @Input() equivalenciasCuentas: EquivalenciaTipoCuenta[] = [];

  // Table
  columns: TableHead[] = [];

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'cfDepositoCuentaTipoTb.descta', header: 'Tipo'         },
      { field: 'equiva',                        header: 'Equivalencia' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
