import { Component, Input, OnInit } from '@angular/core';
import { GrupoTrabajo } from '../../interfaces/grupo-trabajo.interfaces';
import { TableHead } from 'src/app/shared/interfaces/tableHead.interfaces';
import { dropdownType } from 'src/app/shared/interfaces/typesFiles.interfaces';
import { CompanyNominaService } from '../../../shared-empresa/services/company-nomina.service';

@Component({
  selector: 'app-data-table-grupos',
  templateUrl: './data-table-grupos.component.html',
  styleUrls: ['./data-table-grupos.component.scss']
})
export class DataTableGruposComponent implements OnInit {

  // Objeto para mostrar todos los grupos de trabajo por empresa y tipo nomina
  @Input() gruposTrabajo: GrupoTrabajo[] = [];

  // Table
  columns: TableHead[] = [];

  // Filtro dropdown
  diaLaborableFilter: dropdownType[] = [];

  constructor(private companyNominaService: CompanyNominaService) { }

  ngOnInit(): void {
    this.columns = [
      { field: 'codgru',                  header: 'Código'       },
      { field: 'desgru',                  header: 'Descripción'  },
      { field: 'tipoJornada.descripcion', header: 'Tipo jornada' }
    ];
    // Objeto para filtrar los dias laborables en la tabla
    this.diaLaborableFilter = [
      { label: 'Todos',     value: ''  },
      { label: 'Si labora', value: '1' },
      { label: 'No labora', value: '0' }
    ];
  }

  onRowSelect(event: any): void {
    this.companyNominaService.selectRowThirdTable$.emit(event.data);
  }

  onRowUnselect(): void {
    this.companyNominaService.selectRowThirdTable$.emit(null);
  }

}
