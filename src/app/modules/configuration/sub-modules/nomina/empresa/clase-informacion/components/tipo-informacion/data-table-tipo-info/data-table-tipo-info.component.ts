import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { CompanyNominaService } from '../../../../shared-empresa/services/company-nomina.service';
import { TipoInformacion } from '../../../interfaces/tipo-informacion.interfaces';

@Component({
  selector: 'app-data-table-tipo-info',
  templateUrl: './data-table-tipo-info.component.html',
  styleUrls: ['./data-table-tipo-info.component.scss']
})
export class DataTableTipoInfoComponent implements OnInit {

  // Objeto para mostrar todos los niveles de excepcion por empresa y tipo nomina
  @Input() tiposInformaciones: TipoInformacion[] = [];

  // Table
  columns: TableHead[] = [];

  // Obtener el elemento de la tabla mediante el DOM
  @ViewChild('dt') table!: Table;

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id',          header: 'Código'         },
      { field: 'nombre',      header: 'Descripción'    },
      { field: 'fecEfectiva', header: 'Fecha efectiva' },
      { field: 'fechaIni',    header: 'Fecha inicio'   },
      { field: 'fechaFin',    header: 'Fecha fin'      }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
