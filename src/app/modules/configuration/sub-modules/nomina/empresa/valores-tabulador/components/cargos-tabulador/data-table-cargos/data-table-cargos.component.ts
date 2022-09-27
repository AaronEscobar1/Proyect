import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { CargoTabulador } from '../../../interfaces/cargos-tabulador.interfaces';

@Component({
  selector: 'app-data-table-cargos',
  templateUrl: './data-table-cargos.component.html',
  styleUrls: ['./data-table-cargos.component.scss']
})
export class DataTableCargosComponent implements OnInit {

  // Objeto para mostrar en la tabla
  @Input() cargosTabulador: CargoTabulador[] = [];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'nmCargoTabuladorTbId.id', header: 'Código'  },
      { field: 'tabu01.descrip',          header: 'Tabu 01' },
      { field: 'mest01',                  header: 'Meses 01'}
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
