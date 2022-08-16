import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-situacion',
  templateUrl: './data-table-situacion.component.html',
  styleUrls: ['./data-table-situacion.component.scss']
})
export class DataTableSituacionComponent implements OnInit {

  // Objeto para mostrar todos las situaciones por empresa y tipo nomina
  @Input() situaciones: any[] = [];

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  vacacionFilter: dropdownType[] = [];
  esquemaFilter: dropdownType[] = [];
  clasificacionFilter: dropdownType[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codeva', header: 'Código'        },
      { field: 'deseva', header: 'Descripción'   },
      { field: 'vaceva', header: 'Vacación'      },
      { field: 'grueva', header: 'Grupo'         },
      { field: 'coneva', header: 'Cons.'         },
      { field: 'esqeva', header: 'Esquema'       },
      { field: 'claeva', header: 'Clasificación' }
    ];
    // Objeto para filtrar los dias laborables en la tabla
    this.vacacionFilter = [
      { label: 'Si',    value: '1' },
      { label: 'No',    value: '0' }
    ];
    this.esquemaFilter = [
      { label: 'No aplica',    value: '0' },
    ];
    this.clasificacionFilter = [
      { label: 'No aplica',    value: '0' },
    ]
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
