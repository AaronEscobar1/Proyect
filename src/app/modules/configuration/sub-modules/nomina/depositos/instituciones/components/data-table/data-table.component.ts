import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../empresa/shared-empresa/services/company-nomina.service';
import { Institucion } from '../../interfaces/instituciones.interfaces';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Objeto para mostrar en la tabla
  @Input() instituciones!: Institucion[];

  // Table
  columns: TableHead[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codins',                   header: 'Código'           },
      { field: 'desins',                   header: 'Descripción'      },
      { field: 'tipoInstitucion.destip',   header: 'Tipo institución' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
